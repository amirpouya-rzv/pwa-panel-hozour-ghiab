import httpService from "./httpService"


export const employeeService = (params) => {

  return httpService(`admin/worker/search`, "get", null,params)

}

export const employeedeleteService = (device_id) => {
  return httpService(`admin/worker/?device_id=${device_id}`, "delete");
};

export const editEmployeeService= (data) => {
  const formData = new FormData();
formData.append('type', 'device_id');
formData.append('first_name', data.first_name);
formData.append('last_name', data.last_name);
formData.append('device_id', data.decoded_device_id);



  return httpService(`admin/worker/`, "put",formData);
};




export const addemployeeService = (data) => {
  const formdata = new FormData();
  formdata.append("first_name", data.first_name);
  formdata.append("last_name", data.last_name);
  formdata.append("device_id", data.device_id);

  if (data.image) {
    formdata.append("photo", data.image);
  }

  return httpService("admin/worker/", "post", formdata);
};



