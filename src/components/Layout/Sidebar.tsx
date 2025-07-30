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
    <div className={`sidebar-modern text-white h-screen transition-all duration-500 ease-out ${
      isCollapsed ? 'w-20' : 'w-80'
    } flex flex-col relative overflow-hidden`}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -right-5 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Logo Section */}
      <div className="relative p-8 border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 via-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:rotate-3">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-violet-200 bg-clip-text text-transparent">
                VIGNIQ
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">AI-Powered Learning Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-8 px-4 relative">
        <ul className="space-y-3">
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
                      className={`nav-item-modern w-full group ${
                        isDropdownHighlighted ? 'active' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                          <Icon className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:scale-110" />
                          {isDropdownHighlighted && (
                            <div className="absolute -inset-2 bg-blue-400/20 rounded-xl blur animate-pulse"></div>
                          )}
                        </div>
                        {!isCollapsed && (
                          <span className="font-semibold truncate text-base">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className="transition-transform duration-300">
                          {isExpanded ? 
                            <ChevronDown className="w-5 h-5" /> : 
                            <ChevronRight className="w-5 h-5" />
                          }
                        </div>
                      )}
                    </button>
                    {isExpanded && !isCollapsed && item.subItems && (
                      <ul className="ml-8 mt-3 space-y-2 animate-fade-in">
                        {item.subItems.map((subItem, subIndex) => {
                          const SubIcon = subItem.icon;
                          return (
                            <li key={subItem.path} className="animate-slide-right" style={{ animationDelay: `${subIndex * 0.05}s` }}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-4 px-6 py-3 rounded-2xl transition-all duration-300 group ${
                                  isActive(subItem.path) 
                                    ? 'bg-gradient-to-r from-blue-500/30 to-violet-500/30 text-white border border-blue-500/40 shadow-lg shadow-blue-500/20' 
                                    : 'text-slate-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
                                }`}
                              >
                                {SubIcon && (
                                  <SubIcon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                                )}
                                <span className="text-sm font-medium">{subItem.label}</span>
                                {isActive(subItem.path) && (
                                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
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
                      className={`nav-item-modern group ${
                        isActive(regularItem.path) ? 'active' : ''
                      }`}
                    >
                      <div className="relative">
                        <Icon className="w-6 h-6 flex-shrink-0 transition-all duration-300 group-hover:scale-110" />
                        {isActive(regularItem.path) && (
                          <div className="absolute -inset-2 bg-blue-400/20 rounded-xl blur animate-pulse"></div>
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className="font-semibold truncate text-base">{regularItem.label}</span>
                      )}
                      {isActive(regularItem.path) && !isCollapsed && (
                        <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
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
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">AI Assistant</p>
              <p className="text-xs text-slate-300">Ready to help you learn</p>
            </div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;