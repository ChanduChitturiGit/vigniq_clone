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
  Zap
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
          icon: BookOpen,
          label: 'Digital Library',
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
          icon: School,
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
        { path: '/view-ebooks', icon: BookOpen, label: 'Digital Library', roles: ['admin'] }
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
        { path: '/view-ebooks', icon: BookOpen, label: 'Digital Library', roles: ['teacher'] }
      ],
      'student': [
        { path: '/profile', icon: User, label: 'My Profile', roles: ['student'] },
        { path: '/view-ebooks', icon: BookOpen, label: 'Digital Library', roles: ['student'] }
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
    <div className={`sidebar-modern text-white h-screen transition-all duration-500 ease-out ${
      isCollapsed ? 'w-20' : 'w-72'
    } flex flex-col relative overflow-hidden`}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Logo Section */}
      <div className="relative p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-110">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                VIGNIQ
              </h1>
              <p className="text-xs text-slate-400 font-medium">AI-Powered Learning</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-3 relative">
        <ul className="space-y-2">
          {getMenuItems().map((item) => {
            if (item.roles && item.roles.includes(user?.role || '')) {
              const Icon = item.icon;
              
              if ('isDropdown' in item && item.isDropdown) {
                const isExpanded = expandedMenus[item.key];
                const isDropdownHighlighted = isDropdownActive(item.subItems);
                
                return (
                  <li key={item.key} className="animate-slide-up" style={{ animationDelay: `${getMenuItems().indexOf(item) * 0.1}s` }}>
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className={`nav-item-modern w-full ${
                        isDropdownHighlighted ? 'active' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                          <Icon className="w-5 h-5 flex-shrink-0 transition-all duration-300" />
                          {isDropdownHighlighted && (
                            <div className="absolute -inset-1 bg-blue-400/20 rounded-lg blur animate-pulse"></div>
                          )}
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium truncate">{item.label}</span>
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
                      <ul className="ml-6 mt-2 space-y-1 animate-fade-in">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                                  isActive(subItem.path) 
                                    ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white border border-blue-500/30' 
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {SubIcon && (
                                  <SubIcon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                                )}
                                <span className="text-sm font-medium">{subItem.label}</span>
                                {isActive(subItem.path) && (
                                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
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
                  <li key={regularItem.path} className="animate-slide-up" style={{ animationDelay: `${getMenuItems().indexOf(item) * 0.1}s` }}>
                    <Link
                      to={regularItem.path}
                      className={`nav-item-modern ${
                        isActive(regularItem.path) ? 'active' : ''
                      }`}
                    >
                      <div className="relative">
                        <Icon className="w-5 h-5 flex-shrink-0 transition-all duration-300" />
                        {isActive(regularItem.path) && (
                          <div className="absolute -inset-1 bg-blue-400/20 rounded-lg blur animate-pulse"></div>
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium truncate">{regularItem.label}</span>
                      )}
                      {isActive(regularItem.path) && !isCollapsed && (
                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
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
        <div className="p-6 border-t border-slate-700/50 animate-fade-in">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">AI Assistant</p>
              <p className="text-xs text-slate-400">Ready to help</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;