import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  User, 
  Calendar, 
  BarChart3, 
  Settings, 
  Users, 
  BookOpen,
  GraduationCap,
  School,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  FileText,
  UserPlus,
  Upload,
  Eye,
  Sparkles,
  Zap,
  Brain,
  Layers
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
}

interface BaseMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  roles: string[];
}

interface RegularMenuItem extends BaseMenuItem {
  path: string;
}

interface DropdownMenuItem extends BaseMenuItem {
  key: string;
  isDropdown: true;
  subItems: { path: string; label: string; icon?: React.ComponentType<{ className?: string }> }[];
}

type MenuItem = RegularMenuItem | DropdownMenuItem;

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { path: '/dashboard', icon: Home, label: 'Dashboard', roles: ['superadmin', 'admin', 'teacher', 'student'] }
    ];

    const roleSpecificItems: { [key: string]: MenuItem[] } = {
      'superadmin': [
        {
          key: 'school-management',
          icon: School,
          label: 'School Hub',
          roles: ['superadmin'],
          isDropdown: true,
          subItems: [
            { path: '/schools', label: 'All Schools', icon: School },
            { path: '/create-school', label: 'Create School', icon: UserPlus }
          ]
        },
        {
          key: 'ebooks',
          icon: Brain,
          label: 'AI Library',
          roles: ['superadmin'],
          isDropdown: true,
          subItems: [
            { path: '/upload-ebooks', label: 'Upload Content', icon: Upload },
            { path: '/view-ebooks', label: 'Browse Library', icon: Eye }
          ]
        }
      ],
      'admin': [
        {
          key: 'school-management',
          icon: Layers,
          label: 'School Hub',
          roles: ['admin'],
          isDropdown: true,
          subItems: [
            { path: '/admin-school', label: 'My School', icon: School },
            { path: '/classes', label: 'Classes', icon: BookOpen },
            { path: '/teachers', label: 'Teachers', icon: GraduationCap },
            { path: '/students', label: 'Students', icon: Users }
          ]
        },
        { path: '/view-ebooks', icon: Brain, label: 'AI Library', roles: ['admin'] }
      ],
      'teacher': [
        {
          key: 'school-management',
          icon: Users,
          label: 'My Classes',
          roles: ['teacher'],
          isDropdown: true,
          subItems: [
            { path: '/classes', label: 'Classes', icon: BookOpen },
            { path: '/students', label: 'Students', icon: Users }
          ]
        },
        { path: '/view-ebooks', icon: Brain, label: 'AI Library', roles: ['teacher'] }
      ],
      'student': [
        { path: '/profile', icon: User, label: 'My Profile', roles: ['student'] },
        { path: '/view-ebooks', icon: Brain, label: 'AI Library', roles: ['student'] }
      ]
    };

    // Help dropdown - different for superadmin vs others
    const helpSubItems: { path: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [];

    if (user?.role === 'superadmin') {
      helpSubItems.push({ path: '/responses', label: 'Responses', icon: MessageSquare });
    } else {
      helpSubItems.push({ path: '/support', label: 'Support', icon: HelpCircle });
      
      if (user?.role !== 'student') {
        helpSubItems.push({ path: '/admin-requests', label: 'Requests', icon: FileText });
      }
      
      helpSubItems.push({ path: '/responses', label: 'Responses', icon: MessageSquare });
    }

    const helpItems: MenuItem[] = [
      {
        key: 'help',
        icon: HelpCircle,
        label: 'Support Center',
        roles: ['superadmin', 'admin', 'teacher', 'student'],
        isDropdown: true,
        subItems: helpSubItems
      }
    ];

    return [...baseItems, ...(roleSpecificItems[user?.role as keyof typeof roleSpecificItems] || []), ...helpItems];
  };

  const isActive = (path: string) => location.pathname === path;
  
  const isDropdownActive = (subItems: { path: string; label: string }[]) => {
    return subItems.some(subItem => isActive(subItem.path));
  };

  const isDropdownPathActive = (item: DropdownMenuItem) => {
    return item.subItems.some(subItem => location.pathname.startsWith(subItem.path));
  };

  React.useEffect(() => {
    const menuItems = getMenuItems();
    menuItems.forEach((item) => {
      if ('isDropdown' in item && item.isDropdown) {
        const shouldExpand = isDropdownPathActive(item);
        if (shouldExpand && !expandedMenus[item.key]) {
          setExpandedMenus(prev => ({
            ...prev,
            [item.key]: true
          }));
        }
      }
    });
  }, [location.pathname]);

  return (
    <div className={`bg-white border-r border-blue-100 h-screen transition-all duration-300 ease-out ${
      isCollapsed ? 'w-16 md:w-20' : 'w-64 md:w-72 lg:w-80'
    } flex flex-col relative shadow-sm`}>

      {/* Logo Section */}
      <div className="relative p-4 md:p-6 border-b border-blue-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`${isCollapsed ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'} bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105`}>
              <Brain className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6'} text-white`} />
            </div>
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700">
                VIGNIQ
              </h1>
              <p className="text-xs text-blue-500 font-medium">AI Learning Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 md:py-6 px-2 md:px-4 relative overflow-y-auto">
        <ul className="space-y-1 md:space-y-2">
          {getMenuItems().map((item, index) => {
            if (item.roles && item.roles.includes(user?.role || '')) {
              const Icon = item.icon;
              
              if ('isDropdown' in item && item.isDropdown) {
                const isExpanded = expandedMenus[item.key];
                const isDropdownHighlighted = isDropdownActive(item.subItems);
                
                return (
                  <li key={item.key} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 md:py-3 rounded-lg transition-all duration-200 group text-left ${
                        isDropdownHighlighted 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                          <Icon className={`${isCollapsed ? 'w-4 h-4' : 'w-4 h-4 md:w-5 md:h-5'} flex-shrink-0 transition-colors duration-200`} />
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium truncate text-sm md:text-base">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className="transition-transform duration-300">
                          {isExpanded ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </div>
                      )}
                    </button>
                    {isExpanded && !isCollapsed && item.subItems && (
                      <ul className="ml-6 md:ml-8 mt-2 space-y-1 animate-fade-in">
                        {item.subItems.map((subItem, subIndex) => {
                          const SubIcon = subItem.icon;
                          return (
                            <li key={subItem.path} className="animate-slide-right" style={{ animationDelay: `${subIndex * 0.05}s` }}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                                  isActive(subItem.path) 
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                                    : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                              >
                                {SubIcon && (
                                  <SubIcon className="w-4 h-4 transition-colors duration-200" />
                                )}
                                <span className="text-xs md:text-sm font-medium">{subItem.label}</span>
                                {isActive(subItem.path) && (
                                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              } else {
                const regularItem = item as RegularMenuItem;
                return (
                  <li key={regularItem.path} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Link
                      to={regularItem.path}
                      className={`flex items-center gap-3 px-3 py-2 md:py-3 rounded-lg transition-all duration-200 group ${
                        isActive(regularItem.path) 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <div className="relative">
                        <Icon className={`${isCollapsed ? 'w-4 h-4' : 'w-4 h-4 md:w-5 md:h-5'} flex-shrink-0 transition-colors duration-200`} />
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium truncate text-sm md:text-base">{regularItem.label}</span>
                      )}
                      {isActive(regularItem.path) && !isCollapsed && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </Link>
                  </li>
                );
              }
            }
            return null;
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 md:p-6 border-t border-blue-100 animate-fade-in">
          <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-blue-700 truncate">AI Assistant</p>
              <p className="text-xs text-blue-500">Ready to help you learn</p>
            </div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;