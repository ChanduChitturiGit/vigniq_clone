import React, { useState, forwardRef } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

// 👇 use forwardRef here
const MainLayout = forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ children, pageTitle }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <div className="flex h-screen bg-background">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar 
            isCollapsed={isCollapsed} 
            toggleSidebar={toggleSidebar} 
            pageTitle={pageTitle} 
          />
          {/* 👇 forward the ref here */}
          <main ref={ref} className="flex-1 overflow-y-auto bg-slate-50/50">
            <div className="max-w-full p-6 lg:p-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 min-h-[calc(100vh-12rem)]">
                <div className="p-6 lg:p-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

export default MainLayout;
