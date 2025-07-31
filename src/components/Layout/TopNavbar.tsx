import React from 'react';
import { Menu, User, LogOut, HelpCircle, Bell, Search, Settings, Sparkles, Crown, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopNavbarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  pageTitle: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ isCollapsed, toggleSidebar, pageTitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    localStorage.clear();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const handleHelpClick = () => {
    navigate('/support');
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, title: 'New student enrolled in Class 10-A', time: '2 min ago', type: 'info', icon: '👨‍🎓' },
    { id: 2, title: 'Assignment submitted by Alice Johnson', time: '5 min ago', type: 'success', icon: '📝' },
    { id: 3, title: 'System maintenance scheduled for tonight', time: '1 hour ago', type: 'warning', icon: '⚙️' },
    { id: 4, title: 'New AI features available in library', time: '2 hours ago', type: 'feature', icon: '🤖' },
  ];

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return <Crown className="w-4 h-4 text-amber-500" />;
      case 'admin':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'teacher':
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
      default:
        return <User className="w-4 h-4 text-violet-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'superadmin':
        return 'from-amber-500 to-orange-600';
      case 'admin':
        return 'from-blue-500 to-indigo-600';
      case 'teacher':
        return 'from-emerald-500 to-teal-600';
      default:
        return 'from-violet-500 to-purple-600';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 h-16 md:h-20 lg:h-24 flex items-center justify-between px-4 md:px-6 lg:px-8 relative z-10 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
        <button
          onClick={toggleSidebar}
          className="p-2 md:p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 focus-modern group"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
        </button>
        
        <div className="animate-fade-in">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-700 tracking-tight">{pageTitle}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs md:text-sm text-slate-500 font-medium">Welcome back,</p>
            <span className="text-xs md:text-sm text-slate-700 font-semibold">{userData?.user_name || 'User'}</span>
            {getRoleIcon(user?.role)}
          </div>
        </div>
      </div>

      {/* Center Section - Enhanced Search */}
      <div className="hidden lg:flex flex-1 max-w-md xl:max-w-xl mx-8 xl:mx-12">
        <div className="relative w-full group">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 md:w-5 md:h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search students, teachers, classes..."
            className="w-full pl-10 md:pl-12 pr-4 md:pr-6 py-2 md:py-3 rounded-lg bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 placeholder:text-slate-400 text-slate-700 text-sm md:text-base"
          />
          <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 md:p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 focus-modern relative group"
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full">
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">3</span>
            </div>
          </button>

          {/* Enhanced Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg border border-blue-200 p-0 z-50 animate-scale-in shadow-lg">
              <div className="p-4 md:p-6 border-b border-blue-100 bg-blue-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">Notifications</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">4 new</span>
                  </div>
                </div>
              </div>
              <div className="max-h-64 md:max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 md:p-6 hover:bg-blue-50 transition-all duration-200 border-b border-blue-50 last:border-b-0 group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="text-lg md:text-2xl">{notification.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm md:text-base text-slate-900 font-semibold group-hover:text-blue-600 transition-colors duration-200">{notification.title}</p>
                        <p className="text-slate-500 text-sm mt-1">{notification.time}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        notification.type === 'info' ? 'bg-blue-500' :
                        notification.type === 'success' ? 'bg-emerald-500' :
                        notification.type === 'warning' ? 'bg-amber-500' :
                        'bg-violet-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-blue-100 bg-blue-50/50 rounded-b-lg">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-100 transition-all duration-200">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 focus-modern group"
          >
            <div className="relative">
              <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${getRoleColor(user?.role)} rounded-lg flex items-center justify-center shadow-md transition-all duration-200`}>
                <User className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-400 rounded-full border-2 border-white">
                <div className="w-full h-full bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm md:text-base font-bold text-slate-800">{userData?.user_name || 'User'}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-slate-500 capitalize font-medium">{user?.role}</span>
                {getRoleIcon(user?.role)}
              </div>
            </div>
          </button>

          {/* Enhanced User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg border border-blue-200 p-0 z-50 animate-scale-in shadow-lg">
              <div className="p-4 md:p-6 border-b border-blue-100 bg-blue-50 rounded-t-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${getRoleColor(user?.role)} rounded-lg flex items-center justify-center shadow-md`}>
                    <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-base md:text-lg font-bold text-slate-800">{userData?.user_name}</div>
                    <div className="text-sm text-slate-600">{user?.email}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user?.role === 'superadmin' ? 'bg-amber-100 text-amber-800' :
                        user?.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                        user?.role === 'teacher' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-violet-100 text-violet-800'
                      }`}>
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-3 py-2 md:py-3 text-sm text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">My Profile</span>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 md:py-3 text-sm text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-violet-100 text-violet-600 group-hover:bg-violet-200 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Settings</span>
                </button>
                <button
                  onClick={handleHelpClick}
                  className="w-full flex items-center gap-3 px-3 py-2 md:py-3 text-sm text-slate-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors duration-200">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
              
              <div className="p-3 border-t border-blue-100 bg-blue-50/50 rounded-b-lg">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 md:py-3 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-rose-100 text-rose-600 group-hover:bg-rose-200 transition-colors duration-200">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;