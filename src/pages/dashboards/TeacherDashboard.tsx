import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Clock, CheckCircle, ArrowRight, ExternalLink, Brain, Target, Award, TrendingUp } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const stats = [
    {
      title: 'My Classes',
      value: '3',
      subValue: '85 total students',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      link: '/classes'
    },
    {
      title: 'Total Students',
      value: '85',
      subValue: 'across all classes',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      link: '/students'
    },
    {
      title: 'AI Interactions',
      value: '342',
      subValue: 'this week',
      icon: Brain,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      link: '/view-ebooks'
    },
    {
      title: 'Completed Tasks',
      value: '12',
      subValue: 'today',
      icon: CheckCircle,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      link: '/requests'
    }
  ];

  // Mock recent requests from students
  const recentRequests = [
    {
      id: '1',
      studentName: 'Alice Johnson',
      class: 'Class 10-A',
      subject: 'Profile Update Request',
      time: '2 hours ago',
      priority: 'medium',
      avatar: 'AJ'
    },
    {
      id: '2',
      studentName: 'Bob Wilson',
      class: 'Class 9-B',
      subject: 'Grade Review Request',
      time: '4 hours ago',
      priority: 'high',
      avatar: 'BW'
    },
    {
      id: '3',
      studentName: 'Charlie Brown',
      class: 'Class 10-A',
      subject: 'Schedule Change Request',
      time: '1 day ago',
      priority: 'low',
      avatar: 'CB'
    }
  ];

  // Mock classes data
  const myClasses = [
    {
      id: '1',
      name: 'Class 10-A',
      subject: 'Mathematics',
      students: 30,
      nextClass: 'Today 2:00 PM',
      progress: 75
    },
    {
      id: '2',
      name: 'Class 9-B',
      subject: 'Mathematics',
      students: 28,
      nextClass: 'Tomorrow 10:00 AM',
      progress: 68
    },
    {
      id: '3',
      name: 'Class 11-C',
      subject: 'Mathematics',
      students: 27,
      nextClass: 'Tomorrow 3:00 PM',
      progress: 82
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">Teacher Dashboard</h1>
          <p className="text-xl text-slate-600">
            Manage your classes and empower students with AI-driven learning
          </p>
        </div>
        <div className="flex items-center gap-4 animate-slide-left">
          <Link
            to="/view-ebooks"
            className="action-button"
          >
            <Brain className="w-5 h-5" />
            AI Library
          </Link>
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
                    <p className="text-sm text-slate-500 mt-1">{stat.subValue}</p>
                  </div>
                  <div className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Enhanced Recent Requests */}
        <div className="card-modern animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Recent Requests</h2>
              <p className="text-slate-600 mt-1">Student requests requiring attention</p>
            </div>
            <Link 
              to="/requests"
              className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-200 hover:scale-105"
              title="View all requests"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <Link
                  key={request.id}
                  to={`/requests?request=${request.id}`}
                  className="flex items-center justify-between p-6 bg-slate-50/80 rounded-3xl hover:bg-slate-100/80 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      {request.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-base font-bold text-slate-900">{request.studentName}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{request.class} • {request.subject}</p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {request.time}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors duration-200" />
                </Link>
              ))}
              
              {recentRequests.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No recent requests</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced My Classes */}
        <div className="card-modern animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">My Classes</h2>
              <p className="text-slate-600 mt-1">Your teaching schedule and progress</p>
            </div>
            <Link 
              to="/classes"
              className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-200 hover:scale-105"
              title="View all classes"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {myClasses.map((classItem, index) => (
                <Link
                  key={classItem.id}
                  to={`/class-details/${classItem.id}`}
                  className="block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-[1.02] group border border-blue-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">{classItem.name}</p>
                        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-semibold">
                          {classItem.subject}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors duration-200" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">{classItem.students} students</span>
                      <span className="text-slate-500">Next: {classItem.nextClass}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 font-medium">Progress</span>
                        <span className="text-slate-700 font-bold">{classItem.progress}%</span>
                      </div>
                      <div className="progress-modern">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${classItem.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {myClasses.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No classes assigned</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;