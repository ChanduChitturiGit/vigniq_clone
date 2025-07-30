
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { Edit, Search, Plus, GraduationCap,LoaderCircle } from 'lucide-react';
import {getStudentsBySchoolId} from '../services/student';


const Students: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loader,setLoader] = useState(true);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));
  const [students,setStudents] = useState([]);

  // Mock student data
  const allStudents = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@greenwood.edu',
      class: 'Class 10-A',
      rollNumber: '001',
      parentName: 'Robert Johnson',
      phone: '+91 98765 43210',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Bob Wilson',
      email: 'bob.wilson@greenwood.edu',
      class: 'Class 10-A',
      rollNumber: '002',
      parentName: 'Sarah Wilson',
      phone: '+91 98765 43211',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie.brown@greenwood.edu',
      class: 'Class 9-B',
      rollNumber: '001',
      parentName: 'David Brown',
      phone: '+91 98765 43212',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Diana Prince',
      email: 'diana.prince@greenwood.edu',
      class: 'Class 11-A',
      rollNumber: '003',
      parentName: 'Steve Prince',
      phone: '+91 98765 43213',
      status: 'Active'
    }
  ];

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
      <div className="space-y-6">
        <Breadcrumb items={getBreadcrumbItems()} />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          </div>
          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <Link
              to={getAddStudentPath()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students by name, class, roll number or parent name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Link
              key={student.student_id}
              to={`/student-details/${student.student_id}`}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
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
                    <p className="text-sm text-gray-500">{student.class}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Roll Number:</span>
                  <span className="font-medium text-gray-800">{student.roll_number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Parent:</span>
                  <span className="font-medium text-gray-800">{student.parent_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium text-gray-800">{student.parent_phone}</span>
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

        {filteredStudents.length === 0 && !loader &&(
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
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

export default Students;
