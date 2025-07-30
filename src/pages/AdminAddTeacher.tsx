
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import PasswordInput from '../components/ui/password-input';
import ClassSectionSubjectInput, { ClassSectionSubjectData } from '../components/ui/class-section-subject-input';
import { Loader2, Plus } from 'lucide-react';
import { addTeacher } from '../services/teacher';
import { getSubjectsBySchoolId } from '../services/subject';
import { getClassesBySchoolId } from '@/services/class';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from '../components/ui/sonner';
import { useSnackbar } from "../components/snackbar/SnackbarContext";

const AdminAddTeacher: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loader,setLoader] = useState(false);
  const [teachingAssignments, setTeachingAssignments] = useState<ClassSectionSubjectData[]>([{
    class: '', subject: '',
    assignment: undefined
  }]);
  const userData = JSON.parse(localStorage.getItem("vigniq_current_user"));
  const schoolId = JSON.parse(localStorage.getItem("current_school_id"));
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    phone_number: '',
    qualification: '',
    experience: '',
    address: '',
    joining_date: '',
    date_of_birth: '',
    gender: '',
    emergency_contact: ''
  });
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [breadcrumbItems, setBreadCrumbItems] = useState([
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My School', path: '/admin-school' },
    { label: 'Add Teacher' }
  ]);
  const genderList = ["Male", "Female", "Others"];


  const setBreadCrumb = () => {
    if (userData.role == 'superadmin') {
      setBreadCrumbItems([
        { label: 'Schools', path: '/schools' },
        { label: 'My School', path: `/school-details/${schoolId}` },
        { label: 'Add Teacher' }
      ])
    } else {
      setBreadCrumbItems([
        { label: 'My School', path: '/admin-school' },
        { label: 'Add Teacher' }
      ]);
    }
  }

  const subjectsList = async () => {
    const response = await getSubjectsBySchoolId(userData.role == 'superadmin' ? schoolId : userData.school_id);
    if (response && response) {
      setSubjects(response);
    }
  }

  //classes list api
  const getClasses = async () => {
    //classes list api
    const classesData = await getClassesBySchoolId(userData.role == 'superadmin' ? schoolId : userData.school_id);
    if (classesData && classesData.classes) {
      setClasses(classesData.classes);
    }
  }


  useEffect(() => {
    getClasses();
    subjectsList();
    setBreadCrumb();
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      gender: value
    }));
  };

  const getClassId = (className: string) => {
    const classdata = classes.find((val: any) => ('Class ' + val.class_number + ' - ' + val.section) == className);
    const classId = classdata.class_id ? classdata.class_id : 0;
    return classId;
  }

  
  const getSubjectId = (subjectName: string) => {
    const subjectdata = subjects.find((val: any) => (val.name) == subjectName);
    const subjectId = subjectdata.id ? subjectdata.id : 0;
    return subjectId;
  }

  const handleAssignmentChange = (index: number, data: ClassSectionSubjectData) => {
    const updatedAssignments = [...teachingAssignments];
    data[`class_id`] = (data.class!= '' && !data['class_id']) ?  getClassId(data.class) : data['class_id'] ? data['class_id'] : null;
    data[`subject_id`] = (data.subject != '' &&  !data['subject_id']) ?  getSubjectId(data.subject) : null;
    updatedAssignments[index] = data;
    setTeachingAssignments(updatedAssignments);
  };

  const addNewAssignment = () => {
    setTeachingAssignments([...teachingAssignments, {
      class: '', subject: '',
      assignment: undefined
    }]);
  };

  const removeAssignment = (index: number) => {
    if (teachingAssignments.length > 1) {
      const updatedAssignments = teachingAssignments.filter((_, i) => i !== index);
      setTeachingAssignments(updatedAssignments);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.user_name ||
      !formData.email || !formData.phone_number || !formData.qualification ||
      !formData.joining_date || !password) {
      alert('Please fill in all required fields including password');
      return;
    }

    // Filter valid assignments (all three fields must be filled) - now optional
    const validAssignments = teachingAssignments.filter(assignment =>
      assignment.class && assignment.subject
    );

    const teacherData = {
      ...formData,
      subject_assignments: validAssignments,
      password: password,
      school_id: userData.role == 'superadmin' ? schoolId : userData.school_id
    };

    try {
      setLoader(true);
      const response = await addTeacher(teacherData);

      if (response) {
        // alert('Teacher added successfully!');
        showSnackbar({
          title: "Success",
          description: "🧑‍🏫 Teacher added successfully ✅",
          status: "success"
        });
        navigate(userData.role == 'superadmin' ? `/school-details/${schoolId}` : '/admin-school');
      }
    } catch (error: any) {
      showSnackbar({
        title: "⛔ Error",
        description: error?.response?.data?.error || "Something went wrong",
        status: "error"
      });
    }
    setLoader(false);
  };

  return (
    <MainLayout pageTitle="Add Teacher">
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Teacher</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">user name *</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter password"
                  required
                  showGenerator
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., M.Sc Mathematics"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 years"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date *</label>
                <input
                  type="date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <Select value={formData.gender} onValueChange={handleGenderChange} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderList.map((val, index) => (
                      <SelectItem key={index} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>


            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Teaching Assignments (Optional)</label>
                <button
                  type="button"
                  onClick={addNewAssignment}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Assignment
                </button>
              </div>

              <div className="space-y-4">
                {teachingAssignments.map((assignment, index) => (
                  <ClassSectionSubjectInput
                    key={index}
                    data={{ "assignment": assignment, "subjects": subjects, "classes": classes }}
                    onChange={(data) => handleAssignmentChange(index, data)}
                    onRemove={() => removeAssignment(index)}
                    canRemove={teachingAssignments.length > 1}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              {!loader && (
                <>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Teacher
                  </button>
                  <button
                    type="button"
                    // onClick={() => navigate('/admin-school')}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button></>
              )}
              {loader && (
                <Loader2 className="w-10 h-10 mx-auto text-blue animate-spin" />
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminAddTeacher;
