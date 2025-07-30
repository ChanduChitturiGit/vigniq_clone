import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { getSchools } from '../data/schools';
import { Edit, MapPin, Mail, Phone, LoaderCircle as Loader, School, Users, TrendingUp, Plus, Search } from 'lucide-react';
import { getSchoolsList,getBoardsList } from '@/services/school';
import { SpinnerOverlay } from '../pages/SpinnerOverlay';
import { useSnackbar } from "../components/snackbar/SnackbarContext";

const Schools: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [schools, setschools] = useState([]);
  const [loader, setLoader] = useState(true);
  const [boards,setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSchools = async () => {
    setLoader(true);
    try {
      const schoolsList = await getSchoolsList();
      if (schoolsList && schoolsList.schools) {
        setLoader(false);
        setschools(schoolsList.schools);
      }
    }catch(error){
      setLoader(false);
      showSnackbar({
        title: "⛔ Something went wrong ",
        description: "Please refresh and try again",
        status: "error"
      });
    }
  };

  const boardsList = async () => {
    const response = await getBoardsList();
    if(response && response.boards){
      setBoards(response.boards);
    }
  }

  useEffect(() => {
    fetchSchools();
    boardsList();
  }, []);

  const filteredSchools = schools.filter(school =>
    school.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.school_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.school_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbItems = [
    { label: 'Schools' }
  ];

  return (
    <MainLayout pageTitle="Schools">
      <div className="space-y-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="section-header">
          <div className="animate-fade-in">
            <h1 className="section-title">Schools Management</h1>
            <p className="section-subtitle">Manage and monitor all educational institutions</p>
          </div>
          <Link
            to="/create-school"
            className="action-button animate-slide-left"
          >
            <Plus className="w-5 h-5" />
            Create New School
          </Link>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col lg:flex-row gap-6 animate-slide-up">
          <div className="flex-1">
            <div className="search-modern">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search schools by name, address, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 p-4 card-modern bg-blue-50/80">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <School className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Schools</p>
                <p className="text-xl font-bold text-blue-600">{schools.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 card-modern bg-emerald-50/80">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Growth</p>
                <p className="text-xl font-bold text-emerald-600">+12%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-modern grid-cards">
          {filteredSchools.map((school, index) => (
            <Link
              key={school.school_id}
              to={`/school-details/${school.school_id}`}
              className="card-interactive animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
                      <School className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                        {school.school_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="status-active"></div>
                        <span className="text-sm font-medium text-emerald-600">Active</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle edit action
                    }}
                    className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all duration-200 hover:scale-105"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 mt-1">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{school.school_address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <p className="text-slate-600 font-medium">{school.school_contact_number}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <p className="text-slate-600 font-medium">{school.school_email}</p>
                  </div>
                </div>

                <div className="divider-modern"></div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 font-medium">Teachers: {school.teacher_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500 font-medium">Students: {school.student_count || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSchools.length === 0 && !loader && (
          <div className="empty-state animate-fade-in">
            <School className="empty-state-icon" />
            <h3 className="empty-state-title">No Schools Found</h3>
            <p className="empty-state-description">
              {searchTerm 
                ? 'Try adjusting your search terms to find schools.' 
                : 'No schools have been added yet. Create your first school to get started.'}
            </p>
            {!searchTerm && (
              <Link
                to="/create-school"
                className="action-button mt-6"
              >
                <Plus className="w-5 h-5" />
                Create First School
              </Link>
            )}
          </div>
        )}

        {loader && <SpinnerOverlay />}
      </div>
    </MainLayout>
  );
};

export default Schools;