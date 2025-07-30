
import React from 'react';
import { Menu, User, LogOut, HelpCircle } from 'lucide-react';
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

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">{pageTitle}</h1>
          <div className="text-sm text-slate-500">{userData?.full_name && `Welcome back, ${userData.full_name}`}</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
        >
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-slate-800">{userData?.user_name || 'User'}</div>
            <div className="text-xs text-blue-600 font-medium capitalize">{user?.role}</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <User className="w-5 h-5 text-white" />
          </div>
        </button>

        {/* User Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="text-sm font-medium text-slate-800">{userData?.user_name || 'User'}</div>
              <div className="text-xs text-slate-500">{user?.email || `${user?.role} Account`}</div>
            </div>
            <div className="py-1">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              <button
                onClick={handleHelpClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-all duration-200"
              >
                <HelpCircle className="w-4 h-4" />
                Help & Support
              </button>
            </div>
            <div className="border-t border-slate-100 pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
