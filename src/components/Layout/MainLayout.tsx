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
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <TopNavbar 
            isCollapsed={isCollapsed} 
            toggleSidebar={toggleSidebar} 
            pageTitle={pageTitle} 
          />
          <main ref={ref} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 xl:p-10 relative">
            <div className="max-w-full animate-fade-in">
              {children}
            </div>
            
            {/* Enhanced decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/3 to-indigo-400/3 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 left-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-violet-400/3 to-purple-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;