import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { Edit, Plus, Mail, Phone, Search, Users as UsersIcon, LoaderCircle, GraduationCap, Award, TrendingUp } from 'lucide-react';
import {getTeachersBySchoolId} from '../services/teacher';

const Teachers: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers,setTeachers] = useState([]);
  const [loader,setLoader] = useState(true);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));
  
  const getTeachersList = async () => {
    setLoader(true);
    const response = await getTeachersBySchoolId(userData.school_id);
    if(response && response.teachers){
      setLoader(false);
      setTeachers(response.teachers);
    }
  }

  useEffect(() => {
      getTeachersList();
    }, []);

  let filteredTeachers = searchTerm.length>0 ? teachers.filter(teacher =>
    (teacher.teacher_first_name && teacher.teacher_first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ( teacher.teacher_last_name && teacher.teacher_last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ( teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (  teacher.email && teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) )
  ) : teachers;

  const breadcrumbItems = user?.role === 'admin' 
    ? [
        { label: 'School Management', path: '/admin-school' },
        { label: 'Teachers' }
      ]
    : [
        { label: 'User Management', path: '/user-management' },
        { label: 'Teachers' }
      ];

  return (
    <MainLayout pageTitle="Teachers">
      <div className="space-y-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="section-header">
          <div className="flex items-center gap-4 animate-fade-in">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="section-title">Teachers</h1>
              <p className="section-subtitle">Manage your educational team</p>
            </div>
          </div>
          {(user?.role === 'admin' || user?.role === 'superadmin') && (
            <Link
              to={user?.role === 'admin' ? "/admin-add-teacher" : "/add-teacher"}
              className="action-button animate-slide-left"
            >
              <Plus className="w-5 h-5" />
              Add Teacher
            </Link>
          )}
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col lg:flex-row gap-6 animate-slide-up">
          <div className="flex-1">
            <div className="search-modern">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search teachers by name, subject or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 p-4 card-modern bg-emerald-50/80">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <UsersIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Teachers</p>
                <p className="text-xl font-bold text-emerald-600">{teachers.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 card-modern bg-blue-50/80">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-xl font-bold text-blue-600">{teachers.filter(t => t.status !== 'inactive').length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-modern grid-cards">
          {filteredTeachers.map((teacher, index) => (
            <Link
              key={teacher.teacher_id}
              to={`/teacher-details/${teacher.teacher_id}`}
              className="card-interactive animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg text-white text-xl font-bold">
                      {teacher.teacher_first_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-200">
                        {teacher.teacher_first_name + " " + teacher.teacher_last_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-1 rounded-lg bg-emerald-100 text-emerald-600">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">{teacher.subject || 'Multiple Subjects'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="status-active"></div>
                    <span className="text-sm font-medium text-emerald-600">Active</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <p className="text-slate-600 font-medium">{teacher.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <p className="text-slate-600 font-medium">{teacher.phone_number}</p>
                  </div>
                  
                  {teacher.qualification && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                        <Award className="w-4 h-4" />
                      </div>
                      <p className="text-slate-600 font-medium">{teacher.qualification}</p>
                    </div>
                  )}
                </div>

                {teacher.classes && teacher.classes.length > 0 && (
                  <>
                    <div className="divider-modern"></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-3">Teaching Classes:</p>
                      <div className="flex flex-wrap gap-2">
                        {teacher.classes.map((className, index) => (
                          <span
                            key={index}
                            className="tag-modern"
                          >
                            {className}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="badge-success">
                    {teacher.status || 'Active'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTeachers.length === 0 && !loader && (
          <div className="empty-state animate-fade-in">
            <UsersIcon className="empty-state-icon" />
            <h3 className="empty-state-title">No Teachers Found</h3>
            <p className="empty-state-description">
              {searchTerm 
                ? 'Try adjusting your search terms to find teachers.' 
                : 'No teachers have been added yet. Add your first teacher to get started.'}
            </p>
            {!searchTerm && (user?.role === 'admin' || user?.role === 'superadmin') && (
              <Link
                to={user?.role === 'admin' ? "/admin-add-teacher" : "/add-teacher"}
                className="action-button mt-6"
              >
                <Plus className="w-5 h-5" />
                Add First Teacher
              </Link>
            )}
          </div>
        )}

        {loader && (
          <div className="empty-state">
            <LoaderCircle className="empty-state-icon animate-spin text-blue-500" />
            <h3 className="empty-state-title">Loading Teachers</h3>
            <p className="empty-state-description">Please wait while we fetch the teacher data...</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Teachers;