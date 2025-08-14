import httpService from "./httpService";

export const getReport = (params=null) => {
  
  return httpService(`admin/loginsession`, "get",null,params);
};

export const createReport = (data) => {
  // data: { name, lat_max, lat_min, long_max, long_min }
  return httpService("admin/loginsession/", "post", data);
};

export const updateReport = (id, data) => {
  return httpService(`admin/loginsession/${id}/`, "put", data);
};

export const deleteReport = (id) => {
  return httpService(`admin/loginsession/${id}/`, "delete");
};

export const changeCode=(data)=>{
  return httpService(`admin/loginsession/admin-code`, "put",data);
}
