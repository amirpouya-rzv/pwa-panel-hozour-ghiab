import httpService from "./httpService";

export const LoginServiceuser = (data) => {
  return httpService('/token/', 'post', data);
};
