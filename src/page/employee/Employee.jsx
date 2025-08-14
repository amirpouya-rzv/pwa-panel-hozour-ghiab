import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { LuUserSearch } from "react-icons/lu";
import {
  employeedeleteService,
  employeeService,
} from "../../services/employeeservices";
import FilterTime from "../reports/filters/FilterTime";
import { getTodayJalali } from "../../utils/dateutils";
import { MdOutlineCalendarMonth } from "react-icons/md";
import CardItem from "./CardItem";
import EmployeeList from "./EmployeeList";
import EmployeeEditForm from "./EmployeeEditForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getBranches } from "../../services/branchService";
import { createWorkerBranch, deleteWorkerBranch } from "../../services/workerbranch";
import { errorToast, successToast } from "../../utils/toastutils";
import ConfirmModal from "../../components/ConfirmModal"; // اضافه شد
import FilterBranch from "../reports/filters/FilterBranch";
import { GetBranchList } from '../../services/Filterservice'
import { getWorkerBranchSearch } from "../../services/workerbranch";
import {editEmployeeService} from "../../services/employeeservices"
import { frameData } from "framer-motion";

function EmployeeSkeletonCard() {
  return (
    <div className="min-w-[240px] bg-white border-[1.5px] border-[#C6D9FF] rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-start" dir="rtl">
        <div className="flex flex-wrap mt-10 gap-2 text-[12px]">
          <Skeleton height={10} width={60} />
          <Skeleton height={10} width={80} />
          <Skeleton height={10} width={100} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Skeleton circle height={80} width={80} />
          <Skeleton height={20} width={120} className="mt-3" />
          <Skeleton height={12} width={100} className="mt-2" />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton height={24} width={24} borderRadius={12} />
      </div>
    </div>
  );
}

function Employee() {
  const [cards, setCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    decoded_device_id: "",
    branch_default: "",
    photo: null
  });
  const [getbranch, setGetBranch] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false); // اضافه شد
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // اضافه شد
  const [branch,setBranch]=useState()
  const [activeBranches,setActiveBranches]=useState([])
  const [f_name,setF_name]=useState("")
  const [l_name,setL_name]=useState("")

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
  },[formData.decoded_device_id])


  const handleGetEmployee = async () => {
    try {
      setLoading(true);
      const param={
        "branch_id":branch?.id
      }

      const res = await employeeService(param);
      if (res.status === 200) {
        setCards(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getBranchApi=async()=>{
    try {
      const response = await GetBranchList()
      if (response.status == 200) {

        setGetBranch(
          response.data.map(p => ({
            value:p.name,
            label: p.name,
          }))
        )
        
      
      }
    } catch (error) {
      errorToast(error, "خطا در دریافت لیست شعبه")
      setError("خطا در دریافت لیست شعبه")
    } finally {
      setLoading(false)
    }
  }

  useEffect (()=>{
    getBranchApi()
  },[selectedId])

  useEffect(() => {
    handleGetEmployee();
   
  }, [branch]);

  const handleDeleteClick = (worker) => {
    setEmployeeToDelete(worker);
    setShowConfirmModal(true);
  };

  const confirmDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    const device_id = employeeToDelete.decoded_device_id;

    try {
      const res = await employeedeleteService(device_id);

      // فقط اگر وضعیت یکی از دو حالت موفق بود
      if (res.status === 204 || res.status === 200) {
        successToast("کارمند با موفقیت حذف یا غیرفعال شد");
        setSelectedId(null);
        handleGetEmployee();
      } else {
        errorToast("حذف با موفقیت انجام نشد");
      }
    } catch (err) {
      console.error("Delete error", err);
      errorToast("خطا در حذف کارمند");
    } finally {
      setShowConfirmModal(false);
      setEmployeeToDelete(null);
    }
  };


  const selectedCard = cards.find((c) => c.id === selectedId) || null;
  const otherCards = cards.filter((c) => c.id !== selectedId);

  useEffect(() => {
    if (selectedCard) {
      setF_name(selectedCard.first_name)
      setL_name(selectedCard.last_name)
      setFormData({
        first_name: selectedCard.first_name || "",
        last_name: selectedCard.last_name || "",
        decoded_device_id: selectedCard.decoded_device_id || "",
        photo: selectedCard.photo_url || "",
        branch_default:
          typeof selectedCard.branch_default === "string"
            ? selectedCard.branch_default
            : selectedCard.branch_default?.value || "",
        branch:activeBranches
      });
    }
  }, [selectedCard]);


 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const deletedItems=formData.branch.length>0 ?  activeBranches?.filter(it=>!formData.branch?.includes(it)) :[]
  const addedItems=formData.branch.length>0 ?   formData.branch?.filter(it=>!activeBranches?.includes(it)):[]
  console.log(activeBranches,"formData",formData.branch)
  
  // if (formData.branch.length<1) {

  //   errorToast("حداقل یک شعبه انتخاب کنید");
  //   return;
  // }


  try {

  
    if(deletedItems?.length>0){
      for (const branchName of deletedItems) {
        const payload = {
          device_id: formData.decoded_device_id,
          branch_name: branchName,
        };
  
        const res = await deleteWorkerBranch(payload);
     
       
      }
    }
    
    
    if (Array.isArray(addedItems)) {

      // ارسال چند شعبه با درخواست جداگانه
      for (const branchName of addedItems) {
        const payload = {
          device_id: formData.decoded_device_id,
          branch_name: branchName,
        };

        const res = await createWorkerBranch(payload);
        if (res.status == 201) {
       successToast("شعبه‌ها با موفقیت بروزرسانی شدند");
        }
      }
    } else {
      // ارسال یک شعبه منفرد
      const payload = {
        device_id: formData.decoded_device_id,
        branch_name: addedItems[0],
      };
    
 
      const res = await createWorkerBranch(payload);
      if (res.status === 200) {
        successToast("شعبه با موفقیت بروزرسانی شد");
      } 
    }


  
    if(l_name!=formData.last_name || f_name!=formData.first_name){
      successToast("نام شما با موفقیت تغییر کرد");
      const res=await editEmployeeService(formData)
    }
   
    
    handleGetEmployeeBranch()
    setSelectedId(null);
    handleGetEmployee();
  } catch (err) {
    errorToast(err.message);
  }
};



  return (
    <div className="p-5 bg-white dark:bg-lightgray mt-8 md:mb-5 mb-32 md:-mx-4 w-full h-full items-center rounded-3xl" dir="rtl">
      <div className="py-5 w-full text-blue md:flex items-center md:justify-between border-b-2 dark:border-dark_background mb-10 border-blue">
        <div className="flex mx-10 items-center dark:text-dark_background text-blue">
          <LuUserSearch size={40} />
          <p className="text-2xl dark:text-dark_background">کارمندان</p>
        </div>
        <div className="md:flex md:flex-row-reverse text-blue gap-5 items-center p-3 ">
          <span className="flex dark:text-dark_background justify-end md:mt-5 -mt-12 pb-5 items-center gap-2 text-blue">
            <MdOutlineCalendarMonth />
            {getTodayJalali()}
          </span>
          <FilterBranch selectBranch={setBranch} className=""/>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <EmployeeSkeletonCard key={index} />
          ))}
        </div>
      ) : !selectedId ? (
        <EmployeeList
          cards={cards}
          onCardClick={setSelectedId}
          onDelete={handleDeleteClick}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-[30%] bg-white shadow-md rounded-2xl p-4 dark:bg-gradient-to-b dark:from-to_dark_background dark:to-dark_background">
            <div className="flex justify-center dark:text-dark_background text-blue items-center mb-4 border-b dark:border-b-dark_background pb-2 border-blue">
              <FaUserCircle size={30} />
              <p className="text-lg text-blue mr-2 dark:text-dark_background">دیگر پیشنهادی</p>
            </div>
            <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-y-auto md:max-h-[500px] hide-scrollbar">
              {otherCards.slice(0, 10).map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onClick={() => setSelectedId(card.id)}
                  onDelete={() => handleDeleteClick(card)}
                />
              ))}
            </div>
          </div>

          <EmployeeEditForm
            formData={formData}
            setFormData={setFormData}
            selectedCard={selectedCard}
            handleSubmit={handleSubmit}
            onCancel={() => setSelectedId(null)}
            branches={getbranch}
          />
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        title="حذف کارمند"
        message={`آیا از حذف "${employeeToDelete?.first_name} ${employeeToDelete?.last_name}" مطمئن هستید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        onConfirm={confirmDeleteEmployee}
        onCancel={() => {
          setShowConfirmModal(false);
          setEmployeeToDelete(null);
        }}
      />
    </div>
  );
}

export default Employee;
