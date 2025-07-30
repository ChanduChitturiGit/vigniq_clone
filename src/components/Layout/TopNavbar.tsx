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
    <header className="glass-effect border-b border-white/20 h-24 flex items-center justify-between px-8 relative z-10">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <button
          onClick={toggleSidebar}
          className="p-4 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 focus-modern group"
        >
          <Menu className="w-6 h-6 text-slate-600 group-hover:text-slate-800 transition-colors duration-300" />
        </button>
        
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient tracking-tight">{pageTitle}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-500 font-medium">Welcome back,</p>
            <span className="text-slate-700 font-semibold">{userData?.user_name || 'User'}</span>
            {getRoleIcon(user?.role)}
          </div>
        </div>
      </div>

      {/* Center Section - Enhanced Search */}
      <div className="hidden lg:flex flex-1 max-w-xl mx-12">
        <div className="relative w-full group">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search students, teachers, classes..."
            className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/90 transition-all duration-300 placeholder:text-slate-400 text-slate-700 font-medium shadow-soft"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-4 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 focus-modern relative group"
          >
            <Bell className="w-6 h-6 text-slate-600 group-hover:text-slate-800 transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full animate-pulse shadow-lg">
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">3</span>
            </div>
          </button>

          {/* Enhanced Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-4 w-96 card-modern p-0 z-50 animate-scale-in shadow-strong">
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800">Notifications</h3>
                  <div className="flex items-center gap-2">
                    <span className="badge-info">4 new</span>
                  </div>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-6 hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-50 last:border-b-0 group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{notification.icon}</div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-semibold group-hover:text-blue-600 transition-colors duration-200">{notification.title}</p>
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
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-50 transition-all duration-200">
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
            className="flex items-center gap-4 p-3 rounded-3xl hover:bg-white/20 transition-all duration-300 hover:scale-105 focus-modern group"
          >
            <div className="relative">
              <div className={`w-14 h-14 bg-gradient-to-br ${getRoleColor(user?.role)} rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:rotate-3`}>
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white shadow-lg">
                <div className="w-full h-full bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-base font-bold text-slate-800">{userData?.user_name || 'User'}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 capitalize font-medium">{user?.role}</span>
                {getRoleIcon(user?.role)}
              </div>
            </div>
          </button>

          {/* Enhanced User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-4 w-80 card-modern p-0 z-50 animate-scale-in shadow-strong">
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getRoleColor(user?.role)} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-800">{userData?.user_name}</div>
                    <div className="text-sm text-slate-600">{user?.email}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge-modern ${
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
                  className="w-full flex items-center gap-4 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                >
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">My Profile</span>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-4 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                >
                  <div className="p-2 rounded-xl bg-violet-100 text-violet-600 group-hover:bg-violet-200 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Settings</span>
                </button>
                <button
                  onClick={handleHelpClick}
                  className="w-full flex items-center gap-4 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                >
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors duration-200">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
              
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
                >
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-600 group-hover:bg-rose-200 transition-colors duration-200">
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