import React from 'react';
import { Menu, User, LogOut, HelpCircle, Bell, Search, Settings } from 'lucide-react';
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
    { id: 1, title: 'New student enrolled', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Assignment submitted', time: '5 min ago', type: 'success' },
    { id: 3, title: 'System maintenance scheduled', time: '1 hour ago', type: 'warning' },
  ];

  return (
    <header className="glass-effect border-b border-white/20 h-20 flex items-center justify-between px-6 relative z-10">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 focus-modern group"
        >
          <Menu className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors duration-300" />
        </button>
        
        <div className="animate-fade-in">
          <h1 className="heading-3 text-gradient">{pageTitle}</h1>
          <p className="caption">Welcome back, {userData?.user_name || 'User'}</p>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/80 transition-all duration-300 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 focus-modern relative group"
          >
            <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 card-modern p-0 z-50 animate-scale-in">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 hover:bg-slate-50/50 transition-colors duration-200 border-b border-slate-50 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'info' ? 'bg-blue-500' :
                        notification.type === 'success' ? 'bg-emerald-500' :
                        'bg-amber-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 focus-modern group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-semibold text-slate-800">{userData?.user_name || 'User'}</div>
              <div className="text-xs text-slate-500 capitalize">{user?.role}</div>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 card-modern p-0 z-50 animate-scale-in">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{userData?.user_name}</div>
                    <div className="text-sm text-slate-500">{user?.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleHelpClick}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </button>
              </div>
              
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
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