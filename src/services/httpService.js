// services/httpService.js
import axios from "axios";
import config from "./config.json";
import { errorToast } from "../utils/toastutils";

// ایجاد instance اصلی axios بدون Content-Type پیش‌فرض
const api = axios.create({
  baseURL: config.onlineApi,
});

// هندل پاسخ‌ها و خطاها
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        if (!tokens?.refresh) {
          errorToast("دسترسی غیرمجاز. لطفاً دوباره وارد شوید");
          return Promise.reject(error);
        }

        const response = await axios.post(
          config.onlineApi + "token/refresh/",
          { refresh: tokens.refresh }
        );

        const newAccess = response.data.access;
        const updatedTokens = { ...tokens, access: newAccess };
        localStorage.setItem("authTokens", JSON.stringify(updatedTokens));

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        errorToast("نشست شما منقضی شده، لطفاً دوباره وارد شوید");
        localStorage.removeItem("authTokens");
        return Promise.reject(err);
      }
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorToast(data.message || "درخواست نامعتبر بود (400)");
          break;
        case 403:
          errorToast("شما اجازه دسترسی ندارید (403)");
          break;
        case 404:
          errorToast("موردی یافت نشد (404)");
          break;
        case 422:
          errorToast(data.message || "داده‌های معتبر نیستند (422)");
          break;
        case 500:
          errorToast("خطای داخلی سرور (500)");
          break;
        case 503:
          errorToast("سرویس موقتا در دسترس نیست (503)");
          break;
        default:
          errorToast(data.message || `خطایی رخ داده (${status})`);
          break;
      }
    } else if (error.request) {
      errorToast("پاسخی از سرور دریافت نشد");
    } else {
      errorToast("خطا در تنظیمات درخواست");
    }

    return Promise.reject(error);
  }
);

// درخواست عمومی
const httpService = (url, method = "get", data = null, params ) => {

  const tokens = JSON.parse(localStorage.getItem("authTokens"));
  const access = tokens?.access;

  // اگر نوع data از FormData بود، Content-Type رو نمی‌ذاریم
  const isFormData = data instanceof FormData;

  return api({
    url,
    method,
    data,
    params,
    headers: {
      ...(access && { Authorization: `Bearer ${access}` }),
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
  });
};

export default httpService;
