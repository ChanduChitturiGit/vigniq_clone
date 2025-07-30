//teacher api handler.
import api from '../api/api';
import { environment } from '@/environment';

const baseurl = environment.baseurl;
const suburl = '/teacher/manage_teacher';


//get teachers by school id
export const getTeachersBySchoolId = async (schoolId : Number) => {
  const response = await api.get(baseurl+suburl+'/getTeachersBySchoolId',{params : {school_id : schoolId}});
  return response.data;
}

//add new teacher or create new teacher
export const addTeacher = async (data: any): Promise<any> => {
  const response = await api.post<any>(baseurl+suburl+'/addTeacher', data);
  return response.data;
}

//get teachers by teacher id
export const getTeachersById = async (id : Number,schoolId : Number) => {
  const response = await api.get(baseurl+suburl+'/getTeacherById',{params : {teacher_id : id,school_id : schoolId}});
  return response.data;
}

//edit teacher
export const editTeacher = async (data : any) => {
  const response = await api.put(baseurl+suburl+'/updateTeacherById',data);
  return response.data;
}

