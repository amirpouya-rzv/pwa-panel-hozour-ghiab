import httpService from "./httpService";

export const getWorkerBranch = () => {
  return httpService("admin/workerbranch/", "get");
};

export const getWorkerBranchSearch = (param) => {
  return httpService("admin/workerbranch/search", "get",null,param);
};

export const createWorkerBranch = (data) => {
  // data: { device_id, branch_name }
  return httpService("admin/workerbranch/", "post", data);
};

export const updateWorkerBranch = (id, data) => {
  return httpService(`admin/workerbranch/${id}/`, "put", data);
};

// services/workerbranch.js

// حذف ارتباط بین کارمند و شعبه با ارسال body
export const deleteWorkerBranch = (data) => {
  // data = { device_id, branch_name }
  return httpService("admin/workerbranch/", "delete", data);
};
