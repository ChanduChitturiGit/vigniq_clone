import React, { useState, forwardRef } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const MainLayout = forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ children, pageTitle }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <TopNavbar 
            isCollapsed={isCollapsed} 
            toggleSidebar={toggleSidebar} 
            pageTitle={pageTitle} 
          />
          <main ref={ref} className="flex-1 overflow-y-auto p-10 relative">
            <div className="max-w-full animate-fade-in">
              {children}
            </div>
            
            {/* Enhanced decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/5 to-purple-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
              <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-gradient-to-r from-rose-400/5 to-pink-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;