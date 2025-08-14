import { toast } from "react-toastify";

export const showToast = (text, icon = "info", autoClose) => {
  return toast(text, {
    closeOnClick: true,
    autoClose,
    type: icon,
    rtl: true,
  });
};

export const errorToast = (text = "عملیات ناموفق") => {
  return showToast(text, "error");
};

export const successToast = (text = "عملیات موفق") => {
  return showToast(text, "success");
};

export const warningToast = (text = "هشدار") => {
  return showToast(text, "warning");
};
