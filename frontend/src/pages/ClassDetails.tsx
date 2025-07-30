import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { Edit, Search, Plus, X, GraduationCap, LoaderCircle, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { getClassesById, editClass } from '../services/class'
import { getTeachersBySchoolId } from '../services/teacher'
import { useSnackbar } from "../components/snackbar/SnackbarContext";

const ClassDetails: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));
  const [allStudents, setAllStudents] = useState([]);
  const [loader, setLoader] = useState(true);
  const schoolId = localStorage.getItem('current_school_id');
  const [isEditing, setIsEditing] = useState(false);
  const [teachers, setteachers] = useState([]);
  const [formData, setFormData] = useState({
    teacher_id: null,
    class_id: null,
    teacher_name: '',
    school_id: null
  });

  // Mock students data for this class
  const sampleAllStudents = [
    {
      student_id: '1',
      studentname: 'Alice Johnson',
      roll_number: '001',
      email: 'alice.johnson@school.edu',
      parent_name: 'Robert Johnson',
      parent_phone: '+91 98765 43210',
      status: 'Active',
      date_of_birth: '15/05/2008',
      address: '123 Main St, City'
    },
    {
      student_id: '2',
      name: 'Bob Wilson',
      roll_number: '002',
      email: 'bob.wilson@school.edu',
      parent_name: 'Sarah Wilson',
      parent_phone: '+91 98765 43211',
      status: 'Active',
      date_of_birth: '22/03/2008',
      address: '456 Oak Ave, City'
    },
    {
      student_id: '3',
      name: 'Charlie Brown',
      roll_number: '003',
      email: 'charlie.brown@school.edu',
      parent_name: 'David Brown',
      parent_phone: '+91 98765 43212',
      status: 'Active',
      date_of_birth: '10/07/2008',
      address: '789 Pine St, City'
    }
  ];

  // Mock class data
  const sampleClassData = {
    id: id,
    class_name: 'Class 10',
    class_number: 0,
    section: 'A',
    academicYear: '2024-25',
    teacher_name: 'John Smith',
    studends_list: allStudents
  };
  const [classData, setClassData] = useState(sampleClassData);
  const [breadcrumbItems, setBreadCrumbItems] = useState([
    { label: 'My School', path: '/admin-school' },
    { label: `Class Details : ${'Class ' + classData.class_number}-${classData.section}` }
  ]);


  const setBreadCrumb = () => {
    if (userData.role == 'superadmin') {
      setBreadCrumbItems([
        { label: 'Schools', path: '/schools' },
        { label: 'My School', path: `/school-details/${schoolId}` },
        { label: `Class Details : ${'Class ' + classData.class_number}-${classData.section}` }
      ])
    } else {
      setBreadCrumbItems([
        { label: 'My School', path: '/admin-school' },
        { label: `Class Details : ${'Class ' + classData.class_number}-${classData.section}` }
      ]);
    }
  }

  const getTeachers = async () => {
    const teachersData = await getTeachersBySchoolId(userData.role == 'superadmin' ? schoolId : userData.school_id);
    if (teachersData && teachersData.teachers) {
      setteachers(teachersData.teachers);
    }
  }



  const getClass = async () => {
    if (userData && userData.role && userData.role == 'superadmin') {
      userData.school_id = localStorage.getItem('current_school_id');
    }
    setLoader(true);
    const response = await getClassesById(Number(id), userData.school_id);
    if (response && response.class) {
      setClassData(response.class);
      setAllStudents(response.class.studends_list);
      setLoader(false);
      setBreadCrumb();
    }
    getTeachers();
    setBreadCrumb();
  }

  useEffect(() => {
    getClass();
  }, [])

  const handleTeacherChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      teacher_name: value,
      teacher_id : getClassId(value)
    }));
  };

  const getClassId = (teacher: string) => {
    const teacherData = teachers.find((val: any) => (val.teacher_first_name + ' ' + val.teacher_last_name) == teacher);
    const data = teacherData.teacher_id ? teacherData.teacher_id : null;
    return data;
  }

  const saveTeacher = async () => {
    setIsEditing(false);
    formData.school_id = Number(userData.role == 'superadmin' ? schoolId : userData.school_id);
    formData.class_id = Number(id);
    try {
      const response = await editClass(formData);
      if (response && response.message) {
        showSnackbar({
          title: "Success",
          description: "🛄 Class Teacher Updated successfully ✅",
          status: "success"
        });
      } else {
        showSnackbar({
          title: "⛔ Error",
          description: "Something went wrong",
          status: "error"
        });
      }
    } catch (error) {
      showSnackbar({
        title: "⛔ Error",
        description: error?.response?.data?.error || "Something went wrong",
        status: "error"
      });
    }
    getClass();
  }

  const filteredStudents = allStudents.filter(student =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number.includes(searchTerm)
  );



  return (
    <MainLayout pageTitle={`Class ${classData.class_number}-${classData.section} Students`}>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Class Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {'Class ' + classData.class_number} - {classData.section}
              </h1>
              <p className="text-gray-600">{classData.academicYear}</p>
            </div>
            <div className="text-right flex">
              {!isEditing ? (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Class Teacher</p>
                    <p className="font-semibold text-gray-800">{classData.teacher_name || 'N/A'}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class Teacher
                    </label>
                    <Select value={formData.teacher_name} onValueChange={handleTeacherChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher, index) => (
                          <SelectItem key={index} value={teacher.teacher_first_name + ' ' + teacher.teacher_last_name}>
                            {teacher.teacher_first_name + ' ' + teacher.teacher_last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <>
                {isEditing && (
                  <button
                    onClick={saveTeacher}
                    className="flex items-center gap-2 px-4 py-2 mx-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {'Save'}
                  </button>
                )}
              </>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 mx-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-800">{classData.studends_list.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Active Students</p>
              {/* {filteredStudents.filter(s => s.status === 'Active').length} */}
              <p className="text-2xl font-bold text-green-800">{classData.studends_list.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Academic Year</p>
              <p className="text-lg font-bold text-purple-800">{classData.academicYear || '2025-26'}</p>
            </div>
          </div>
        </div>

        {/* Search and Add Student */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {(userData?.role === 'superadmin' || userData?.role === 'admin' || userData?.role === 'teacher') && (
            <Link
              to={'/add-student'}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </Link>
          )}
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Link
              key={student.student_id}
              to={`/student-details/${student.student_id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {student.student_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{student.student_name}</h3>
                    <p className="text-sm text-gray-500">Roll: {student.roll_number}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle edit action
                  }}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Parent:</span>
                  <span className="font-medium text-gray-800">{student.parent_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium text-gray-800">{student.parent_phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium text-gray-800 truncate">{student.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {student.status || 'active'}
                </span>
              </div>
            </Link>
          ))}
        </div>
        {filteredStudents.length === 0 && !loader && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Students found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No students have been added yet.'}
            </p>
          </div>
        )}
        {
          loader && (
            <div className="text-center py-12">
              <LoaderCircle className="spinner-icon mx-auto" size={40} />
            </div>
          )
        }
      </div>
    </MainLayout>
  );
};

export default ClassDetails;
