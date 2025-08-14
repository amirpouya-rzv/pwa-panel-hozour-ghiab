import httpService from "./httpService";

export const getBranches = () => {
  return httpService("admin/branch/", "get");
};

export const createBranch = (data) => {
  // data: { name, lat_max, lat_min, long_max, long_min }
  return httpService("admin/branch/", "post", data);
};

export const updateBranch = (id, data) => {
  return httpService(`admin/branch/${id}/`, "put", data);
};

export const deleteBranch = (id) => {
  return httpService(`admin/branch/${id}/`, "delete");
};
