import React from 'react';
import { Users, BookOpen, School, MapPin, Phone, Mail, TrendingUp, Award, Target, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSchools } from '../../data/schools';

const AdminDashboard: React.FC = () => {
  const schools = getSchools();
  const school = schools[0]; // Assuming admin manages first school

  const stats = [
    {
      title: 'Teachers',
      value: '9',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      change: '12% from last month',
      link: '/teachers'
    },
    {
      title: 'Classes',
      value: '5',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      change: '5% from last month',
      link: '/classes'
    },
    {
      title: 'Students',
      value: '127',
      icon: Target,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      change: '8% from last month',
      link: '/students'
    },
    {
      title: 'AI Interactions',
      value: '1,240',
      icon: Brain,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      change: '23% from last month',
      link: '/view-ebooks'
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">Admin Dashboard</h1>
          <p className="text-xl text-slate-600">Manage your school with AI-powered insights</p>
        </div>
        <Link
          to="/admin-school"
          className="action-button animate-slide-left"
        >
          <School className="w-5 h-5" />
          Manage School
        </Link>
      </div>

      {/* Enhanced School Info Card */}
      <div className="card-modern p-8 animate-slide-up relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <School className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gradient">{school.name}</h2>
              <p className="text-slate-600 font-medium">Your Educational Institution</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-600">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors duration-200">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-medium">{school.address}</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors duration-200">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium">{school.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors duration-200">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">{school.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid-modern grid-responsive">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stats-card group-hover:shadow-2xl group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="metric-label">{stat.title}</p>
                    <p className="metric-value">{stat.value}</p>
                    <div className="metric-change positive">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                  <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-4/5 transition-all duration-1000`}></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card-modern animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-900">Quick Actions</h2>
          <p className="text-slate-600 mt-2">Manage your school efficiently</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/admin-add-teacher"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-blue-700">Add Teacher</span>
            </Link>
            
            <Link
              to="/add-class"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-emerald-700">Create Class</span>
            </Link>
            
            <Link
              to="/add-student"
              className="flex items-center gap-4 p-6 rounded-3xl border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-300 group hover:scale-105"
            >
              <div className="p-3 rounded-2xl bg-violet-100 text-violet-600 group-hover:bg-violet-200 transition-colors duration-300">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 group-hover:text-violet-700">Add Student</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;