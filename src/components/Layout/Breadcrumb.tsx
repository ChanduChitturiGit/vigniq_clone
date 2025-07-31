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
    <nav className="mb-4 md:mb-6">
      <div className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50 group"
        >
          <div className="p-1 rounded bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm hidden sm:inline">Home</span>
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            {item.path ? (
              <Link
                to={item.path}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors duration-200 font-medium px-2 py-1 rounded hover:bg-blue-50 text-sm"
              >
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-slate-800 font-semibold px-2 py-1 rounded bg-blue-50 text-sm">
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