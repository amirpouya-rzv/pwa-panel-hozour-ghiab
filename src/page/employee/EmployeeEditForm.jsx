import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AppInput from "../../components/shared/AppInput";
import CustomSelect from '../../components/shared/CustomSelect'
import { getWorkerBranchSearch } from "../../services/workerbranch";
import { from } from "jalali-moment";
import { errorToast } from "../../utils/toastutils";
function EmployeeEditForm({ formData, setFormData, selectedCard, handleSubmit, onCancel, branches }) {
  const [activeBranches,setActiveBranches]=useState([])


  const handleGetEmployeeBranch= async () => {
    try {
      if(formData.decoded_device_id!=""){
        const param={
          "device_id":formData.decoded_device_id
        }

        
        const res = await getWorkerBranchSearch(param);

        if (res.status === 200) {
            
          setActiveBranches(
            res?.data?.map(it=>(
              it.branch_name
          ))
          )

        }
      }
    
    } catch (err) {
      console.log(err);
    } 
  };
  useEffect(()=>{
    handleGetEmployeeBranch()
  },[formData])

  function setName(e){
    if(e.target.value!=""){
      setFormData({ ...formData, first_name: e.target.value })
    }else{
      errorToast("نام شما نمیتواند خالی باشد")
    }
   
  }
  function setFamilyName(e){
    if(e.target.value!=""){
      setFormData({ ...formData, last_name: e.target.value })
    }else{
      errorToast("نام خانوادگی شما نمیتواند خالی باشد")
    }
   
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-10/12 dark:bg-darkgray dark:text-white bg-white shadow-xl pt-16 p-6 rounded-lg flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[90vh]"
      dir="rtl"
    >
      <div className="flex flex-col items-center md:w-96 order-1 md:order-2">
        {
          formData?.photo?
          <img
          src={formData?.photo}
          alt="employee"
          className="w-[200px] h-[200px] mb-10 rounded-full object-cover border-2 border-blue dark:border-black"
          />
          :
          <FaUserCircle size={200} />
        }
        
        <div className="flex w-auto dark:border-lightgray px-20 flex-col items-center border-2 h-60 border-blue rounded-bl-3xl rounded-tr-3xl mt-4">
          <p className="text-xl mt-4 ">شناسه یکتا:</p>
          <p className="mt-12 text-2xl">{selectedCard?.decoded_device_id}</p>
        </div>
      </div>

      <div className="flex gap-y-10 flex-col dark:text-darkgray gap-5 w-full order-2 md:order-1">
        <AppInput
          title="نام :"
          label="نام"
          value={formData.first_name ?? ""}
          onChange={setName}
        />
        <AppInput
          title="نام خانوادگی :"
          label="نام خانوادگی"
          value={formData.last_name ?? ""}
          onChange={setFamilyName }
        />

        <span className="-mb-2 text-xl dark:text-lightgray">شعبه:</span>
        <CustomSelect
          options={branches}
          value={activeBranches || []}  
          onChange={(val) => setFormData({ ...formData, branch: val })}
        />


        <div className="flex justify-center gap-5">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            ثبت
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            لغو
          </button>
        </div>
      </div>
    </form>
  );
}

export default EmployeeEditForm;
