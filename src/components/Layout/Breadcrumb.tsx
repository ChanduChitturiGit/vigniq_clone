import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb-modern">
      <div className="flex items-center space-x-3 p-4 card-modern bg-white/60 backdrop-blur-sm">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all duration-200 hover:scale-105 p-2 rounded-xl hover:bg-blue-50 group"
        >
          <div className="p-1 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-medium hidden sm:inline">Home</span>
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            {item.path ? (
              <Link
                to={item.path}
                className="breadcrumb-item group flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="breadcrumb-current flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{item.label}</span>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;