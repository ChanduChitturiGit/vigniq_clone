import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { Edit, Search, Plus, GraduationCap, LoaderCircle, Users, TrendingUp, Award } from 'lucide-react';
import {getStudentsBySchoolId} from '../services/student';

const Students: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loader,setLoader] = useState(true);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));
  const [students,setStudents] = useState([]);

  const filteredStudents = students.filter(student =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.includes(searchTerm) ||
    student.parent_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBreadcrumbItems = () => {
    if (user?.role === 'admin') {
      return [
        { label: 'School Management', path: '/admin-school' },
        { label: 'Students' }
      ];
    } else if (user?.role === 'teacher') {
      return [
        { label: 'School Management' },
        { label: 'Students' }
      ];
    } else {
      return [
        { label: 'School Management' },
        { label: 'Students' }
      ];
    }
  };

  const getStudents = async () => {
    setLoader(true);
    const response = await getStudentsBySchoolId(userData.school_id);
    if(response && response.students){
      setLoader(false);
      setStudents(response.students);
    }
  }

  useEffect(()=>{
    getStudents();
  },[])

  const getAddStudentPath = () => {
    return '/add-student';
  };

  return (
    <MainLayout pageTitle="Students">
      <div className="space-y-8">
        <Breadcrumb items={getBreadcrumbItems()} />
        
        <div className="section-header">
          <div className="flex items-center gap-4 animate-fade-in">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="section-title">Students</h1>
              <p className="section-subtitle">Manage your student community</p>
            </div>
          </div>
          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <Link
              to={getAddStudentPath()}
              className="action-button animate-slide-left"
            >
              <Plus className="w-5 h-5" />
              Add Student
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
                placeholder="Search students by name, class, roll number or parent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 p-4 card-modern bg-violet-50/80">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Students</p>
                <p className="text-xl font-bold text-violet-600">{students.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 card-modern bg-emerald-50/80">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-xl font-bold text-emerald-600">{students.filter(s => s.is_active).length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-modern grid-cards">
          {filteredStudents.map((student, index) => (
            <Link
              key={student.student_id}
              to={`/student-details/${student.student_id}`}
              className="card-interactive animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg text-white text-xl font-bold">
                      {student.student_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-violet-600 transition-colors duration-200">
                        {student.student_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-1 rounded-lg bg-blue-100 text-blue-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">{student.class}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="status-active"></div>
                    <span className="text-sm font-medium text-emerald-600">Active</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/80">
                    <span className="text-slate-600 font-medium">Roll Number:</span>
                    <span className="font-bold text-slate-800 px-3 py-1 bg-blue-100 text-blue-800 rounded-xl">
                      {student.roll_number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/80">
                    <span className="text-slate-600 font-medium">Parent:</span>
                    <span className="font-bold text-slate-800">{student.parent_name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/80">
                    <span className="text-slate-600 font-medium">Contact:</span>
                    <span className="font-bold text-slate-800">{student.parent_phone}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="badge-success">
                    {student.status || 'Active'}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Grade: A-</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredStudents.length === 0 && !loader && (
          <div className="empty-state animate-fade-in">
            <GraduationCap className="empty-state-icon" />
            <h3 className="empty-state-title">No Students Found</h3>
            <p className="empty-state-description">
              {searchTerm 
                ? 'Try adjusting your search terms to find students.' 
                : 'No students have been added yet. Add your first student to get started.'}
            </p>
            {!searchTerm && (user?.role === 'admin' || user?.role === 'teacher') && (
              <Link
                to={getAddStudentPath()}
                className="action-button mt-6"
              >
                <Plus className="w-5 h-5" />
                Add First Student
              </Link>
            )}
          </div>
        )}

        {loader && (
          <div className="empty-state">
            <LoaderCircle className="empty-state-icon animate-spin text-violet-500" />
            <h3 className="empty-state-title">Loading Students</h3>
            <p className="empty-state-description">Please wait while we fetch the student data...</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Students;