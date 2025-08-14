import httpService from "./httpService";

export const getloginsession = (id = null) => {
    const url = id ? `admin/loginsession/?parent=${id}` : "loginsession/";
    return httpService(url, "get");
};

export const createloginsession = (data) => {
    // data: { device_id, branch_name }
    return httpService("admin/loginsession/", "post", data);
};

export const updateloginsession = (id, data) => {
    return httpService(`admin/loginsession/${id}/`, "put", data);
};

export const deleteloginsession = (id) => {
    return httpService(`admin/loginsession/${id}/`, "delete");
};
