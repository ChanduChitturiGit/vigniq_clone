import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { getClasses } from '../data/classes';
import { Users, Plus, Search, BookOpen, LoaderCircle, TrendingUp, Target } from 'lucide-react';
import { getClassesBySchoolId } from '@/services/class';

const Classes: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [classes,setClasses] = useState([]);
  const [loader,setLoader] = useState(true);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));

  const filteredClasses = classes.filter(classItem =>
    (classItem.class_number && classItem.class_number.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (classItem.section && classItem.section.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (classItem.class_number && classItem.section && ('Class '+classItem.class_number + ' - ' + classItem.section).toLowerCase().includes(searchTerm.toLowerCase())) ||
    (classItem.teacher_name && classItem.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const breadcrumbItems = user?.role === 'admin'
    ? [
      { label: 'School Management', path: '/admin-school' },
      { label: 'Classes' }
    ]
    : [
      { label: 'School Management' },
      { label: 'Classes' }
    ];

  //classes list api
  const getClasses = async () => {
    //classes list api
    setLoader(true);
    const classesData = await getClassesBySchoolId(userData.school_id);
    if (classesData && classesData.classes) {
      setLoader(false);
      setClasses(classesData.classes);
    }
  }

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <MainLayout pageTitle="Classes">
      <div className="space-y-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="section-header">
          <div className="flex items-center gap-4 animate-fade-in">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="section-title">Classes</h1>
              <p className="section-subtitle">Manage your educational classes and sections</p>
            </div>
          </div>
          {user?.role === 'admin' && (
            <Link
              to="/add-class"
              className="action-button animate-slide-left"
            >
              <Plus className="w-5 h-5" />
              Add Class
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
                placeholder="Search classes by name, section, teacher or academic year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 p-4 card-modern bg-blue-50/80">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Classes</p>
                <p className="text-xl font-bold text-blue-600">{classes.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 card-modern bg-emerald-50/80">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Students</p>
                <p className="text-xl font-bold text-emerald-600">
                  {classes.reduce((sum, cls) => sum + (cls.student_count || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-modern grid-cards">
          {filteredClasses.map((classItem, index) => (
            <Link
              key={classItem.class_id}
              to={`/class-details/${classItem.class_id}`}
              className="card-interactive animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                        {'Class '+classItem.class_number} - {classItem.section}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-1 rounded-lg bg-blue-100 text-blue-600">
                          <Target className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">{classItem.academicYear || '2025-26'}</span>
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
                    <span className="text-slate-600 font-medium">Students:</span>
                    <span className="font-bold text-slate-800 px-3 py-1 bg-blue-100 text-blue-800 rounded-xl">
                      {classItem.student_count}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/80">
                    <span className="text-slate-600 font-medium">Teacher:</span>
                    <span className="font-bold text-slate-800">{classItem.teacher_name ? classItem.teacher_name : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/80">
                    <span className="text-slate-600 font-medium">Board:</span>
                    <span className="font-bold text-slate-800">{classItem.school_board_name || 'Standard'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="badge-success">
                    Active
                  </span>
                  <div className="flex items-center gap-2 text-slate-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Progress: 75%</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredClasses.length === 0 && !loader && (
          <div className="empty-state animate-fade-in">
            <BookOpen className="empty-state-icon" />
            <h3 className="empty-state-title">No Classes Found</h3>
            <p className="empty-state-description">
              {searchTerm 
                ? 'Try adjusting your search terms to find classes.' 
                : 'No classes have been added yet. Create your first class to get started.'}
            </p>
            {!searchTerm && user?.role === 'admin' && (
              <Link
                to="/add-class"
                className="action-button mt-6"
              >
                <Plus className="w-5 h-5" />
                Add First Class
              </Link>
            )}
          </div>
        )}

        {loader && (
          <div className="empty-state">
            <LoaderCircle className="empty-state-icon animate-spin text-blue-500" />
            <h3 className="empty-state-title">Loading Classes</h3>
            <p className="empty-state-description">Please wait while we fetch the class data...</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Classes;