//school api handler.
import api from '../api/api';
import { environment } from '@/environment';

const baseurl = environment.baseurl;
const suburl = '/teacher/manage_subject';


//get school list by schoolId
export const getSubjectsBySchoolId = async (schoolId : Number) => {
  const response = await api.get(baseurl+suburl+'/getSubjects',{params : {school_id : schoolId}});
  return response.data;
};

//get school list
export const getSubjectsList = async () => {
  const response = await api.get(baseurl+suburl+'/getSubjects');
  return response.data;
};