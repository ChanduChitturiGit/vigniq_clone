import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-8 animate-fade-in">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors duration-200 hover:scale-105"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          {item.path ? (
            <Link
              to={item.path}
              className="text-slate-500 hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium px-2 py-1 rounded-lg hover:bg-blue-50"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold px-2 py-1 rounded-lg bg-blue-50/50">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;