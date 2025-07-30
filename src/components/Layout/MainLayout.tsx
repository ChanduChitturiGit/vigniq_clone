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
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <TopNavbar 
            isCollapsed={isCollapsed} 
            toggleSidebar={toggleSidebar} 
            pageTitle={pageTitle} 
          />
          <main ref={ref} className="flex-1 overflow-y-auto p-8 relative">
            <div className="max-w-full animate-fade-in">
              {children}
            </div>
            
            {/* Decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse-soft"></div>
              <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-violet-400/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }}></div>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;