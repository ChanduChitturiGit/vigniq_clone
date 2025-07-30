import React from 'react';
import { User, Calendar, BookOpen, Award, Brain, Target, TrendingUp, Clock, Star } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Attendance',
      value: '95%',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      change: '+2%'
    },
    {
      title: 'Assignments',
      value: '8/10',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      change: '80% complete'
    },
    {
      title: 'Average Grade',
      value: 'A-',
      icon: Award,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      change: '+0.3 GPA'
    },
    {
      title: 'AI Study Hours',
      value: '24h',
      icon: Brain,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      change: 'This week'
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Math Homework - Chapter 5',
      subject: 'Mathematics',
      dueDate: 'Tomorrow',
      priority: 'high',
      progress: 60
    },
    {
      id: 2,
      title: 'Science Project Report',
      subject: 'Physics',
      dueDate: 'Next Friday',
      priority: 'medium',
      progress: 30
    },
    {
      id: 3,
      title: 'English Essay - Literature Review',
      subject: 'English',
      dueDate: 'Next Monday',
      priority: 'medium',
      progress: 80
    }
  ];

  const recentGrades = [
    {
      id: 1,
      subject: 'Mathematics',
      assignment: 'Quiz 3',
      grade: 'A',
      score: 95,
      color: 'emerald'
    },
    {
      id: 2,
      subject: 'Science',
      assignment: 'Lab Report',
      grade: 'B+',
      score: 87,
      color: 'blue'
    },
    {
      id: 3,
      subject: 'English',
      assignment: 'Essay',
      grade: 'A-',
      score: 92,
      color: 'violet'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-rose-200 bg-rose-50';
      case 'medium': return 'border-amber-200 bg-amber-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-slate-200 bg-slate-50';
    }
  };

  const getGradeColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'from-emerald-500 to-teal-600';
      case 'blue': return 'from-blue-500 to-indigo-600';
      case 'violet': return 'from-violet-500 to-purple-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">Student Dashboard</h1>
          <p className="text-xl text-slate-600">
            Track your academic progress and AI-powered learning journey
          </p>
        </div>
        <div className="animate-slide-left">
          <div className="flex items-center gap-3 p-4 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Current Rank</p>
              <p className="text-lg font-bold text-blue-600">#3 in Class</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid-modern grid-responsive">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stats-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="metric-label">{stat.title}</p>
                  <p className="metric-value">{stat.value}</p>
                  <div className="metric-change positive">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className={`h-2 ${stat.bgColor} rounded-full overflow-hidden`}>
                <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full w-4/5 transition-all duration-1000`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Enhanced Upcoming Assignments */}
        <div className="card-modern animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Upcoming Assignments</h2>
                <p className="text-slate-600 mt-1">Stay on top of your deadlines</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-100 text-rose-600">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className={`p-6 rounded-3xl border-2 ${getPriorityColor(assignment.priority)} hover:scale-[1.02] transition-all duration-300 group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{assignment.title}</h3>
                      <p className="text-sm text-slate-600 font-medium">{assignment.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${assignment.priority === 'high' ? 'text-rose-600' : assignment.priority === 'medium' ? 'text-amber-600' : 'text-blue-600'}`}>
                        Due: {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Progress</span>
                      <span className="text-slate-700 font-bold">{assignment.progress}%</span>
                    </div>
                    <div className="progress-modern">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Recent Grades */}
        <div className="card-modern animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Recent Grades</h2>
                <p className="text-slate-600 mt-1">Your latest academic achievements</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {recentGrades.map((grade) => (
                <div key={grade.id} className="flex items-center justify-between p-6 bg-slate-50/80 rounded-3xl hover:bg-slate-100/80 transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getGradeColor(grade.color)} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{grade.grade}</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{grade.subject}</p>
                      <p className="text-sm text-slate-600 font-medium">{grade.assignment}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-700">{grade.score}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(grade.score / 20) ? 'text-amber-400 fill-current' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Learning Insights */}
      <div className="card-modern animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">AI Learning Insights</h2>
              <p className="text-slate-600">Personalized recommendations for your learning journey</p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800">Focus Areas</h3>
              </div>
              <p className="text-slate-600 text-sm">Algebra and Geometry need more practice</p>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800">Improvement</h3>
              </div>
              <p className="text-slate-600 text-sm">Science scores improved by 15% this month</p>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800">Study Time</h3>
              </div>
              <p className="text-slate-600 text-sm">Optimal study time: 4-6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;