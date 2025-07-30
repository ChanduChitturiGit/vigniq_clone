import React from 'react';
import { Link } from 'react-router-dom';
import { 
  School, 
  Users, 
  Shield, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  UserCheck,
  Settings,
  BarChart3,
  Brain,
  Sparkles,
  Zap,
  Globe,
  Award,
  Target
} from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    totalSchools: 25,
    totalUsers: 2450,
    totalAdmins: 35,
    activeSchools: 23,
    pendingRequests: 8,
    completedRequests: 156,
    inProgressRequests: 12,
    aiInteractions: 15420,
    learningHours: 8750
  };

  const recentActivities = [
    {
      id: 1,
      type: 'school_created',
      message: 'New school "Sunrise Academy" has been created',
      timestamp: '2 hours ago',
      icon: School,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 2,
      type: 'admin_assigned',
      message: 'Admin Sarah Johnson assigned to Greenwood High',
      timestamp: '4 hours ago',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'ai_milestone',
      message: 'AI system processed 1000+ learning interactions today',
      timestamp: '6 hours ago',
      icon: Brain,
      color: 'text-violet-600',
      bgColor: 'bg-violet-100'
    },
    {
      id: 4,
      type: 'request_completed',
      message: 'System upgrade request completed for Tech Valley School',
      timestamp: '8 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    }
  ];

  const quickStats = [
    {
      title: 'Total Schools',
      value: stats.totalSchools,
      change: '+12%',
      changeType: 'positive',
      icon: School,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      link: '/schools'
    },
    {
      title: 'Active Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      link: '/schools'
    },
    {
      title: 'AI Interactions',
      value: stats.aiInteractions.toLocaleString(),
      change: '+24%',
      changeType: 'positive',
      icon: Brain,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      link: '/view-ebooks'
    },
    {
      title: 'Learning Hours',
      value: stats.learningHours.toLocaleString(),
      change: '+15%',
      changeType: 'positive',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      link: '/schools'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">Super Admin Dashboard</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Manage the entire AI-powered learning ecosystem and monitor all activities
          </p>
        </div>
        <div className="flex items-center space-x-4 animate-slide-left">
          <Link
            to="/create-school"
            className="action-button"
          >
            <School className="w-5 h-5" />
            Create School
          </Link>
          <Link
            to="/upload-ebooks"
            className="btn-success flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            Upload AI Content
          </Link>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid-modern grid-responsive">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Link 
              key={stat.title}
              to={stat.link} 
              className="group animate-scale-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stats-card group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <p className="metric-label">{stat.title}</p>
                    <p className="metric-value">{stat.value}</p>
                    <div className={`metric-change ${stat.changeType}`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                      <span className="text-slate-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                  <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-3/4 transition-all duration-1000`}></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Request Overview */}
      <div className="grid-modern grid-cards">
        <Link to="/admin-requests" className="group animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="feature-card">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Pending Requests</h3>
                <p className="text-4xl font-bold text-rose-600 mt-2">{stats.pendingRequests}</p>
                <p className="text-slate-500 mt-1">Needs immediate attention</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="feature-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">In Progress</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">{stats.inProgressRequests}</p>
              <p className="text-slate-500 mt-1">Currently being processed</p>
            </div>
          </div>
        </div>

        <div className="feature-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Completed</h3>
              <p className="text-4xl font-bold text-emerald-600 mt-2">{stats.completedRequests}</p>
              <p className="text-slate-500 mt-1">Successfully resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card-modern animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Recent System Activities</h2>
            <div className="flex items-center gap-2 text-slate-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live updates</span>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-6 p-6 rounded-3xl hover:bg-slate-50/80 transition-all duration-300 hover:scale-[1.02] group">
                  <div className={`p-3 rounded-2xl ${activity.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold text-lg">{activity.message}</p>
                    <p className="text-slate-500 mt-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {activity.timestamp}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-modern animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900">Quick Actions</h2>
          <p className="text-slate-600 mt-2">Frequently used administrative tools</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/create-school"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-300">
                <School className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-blue-700">Create School</span>
            </Link>
            
            <Link
              to="/schools"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors duration-300">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-emerald-700">Manage Schools</span>
            </Link>
            
            <Link
              to="/admin-requests"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors duration-300">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-amber-700">View Requests</span>
            </Link>
            
            <Link
              to="/upload-ebooks"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-violet-100 text-violet-600 group-hover:bg-violet-200 transition-colors duration-300">
                <Brain className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-violet-700">AI Content</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;