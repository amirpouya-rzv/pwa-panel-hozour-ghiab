import httpService from "./httpService";

export const CountServiceuser = (data) => {
  return httpService('admin/stats/', 'get', data);
};
