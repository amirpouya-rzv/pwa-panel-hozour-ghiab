// AddEmployee.jsx
import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { LuSquareUser } from "react-icons/lu";
import { addemployeeService, employeeService } from "../../services/employeeservices";
import { successToast, errorToast } from "../../utils/toastutils";
import AddEmployeeList from "./AddEmployeeList";
import AddEmployeeForm from "./AddEmployeeForm";
import { getTodayJalali } from "../../utils/dateutils";
import { getBranches } from "../../services/branchService";
import { createWorkerBranch } from "../../services/workerbranch";
import ToggleButton from "../../components/shared/ToggleButton";

function AddEmployee() {
  const [cards, setCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    branch_name: [], // تغییر به آرایه برای چند انتخاب
    device_id: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);

  // گرفتن لیست کارمندان
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await employeeService();
      if (res.status === 200) setCards(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // گرفتن لیست شعبه‌ها
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const res = await getBranches();
        if (res.status === 200) {
          setBranches(
            res.data.map((p) => ({
              id: p.id,
              label: p.name,
              value: p.name,
            }))
          );
        }
      } catch (err) {
        console.error("خطا در دریافت شعب:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const selectedCard = cards.find((c) => c.id === selectedId) || null;
  const otherCards = cards.filter((c) => c.id !== selectedId);

  // زمانی که کارت انتخاب می‌شود، اطلاعاتش در فرم قرار بگیرد
  useEffect(() => {
    if (selectedCard) {
      setFormData({
        first_name: selectedCard.first_name || "",
        last_name: selectedCard.last_name || "",
        branch_name: Array.isArray(selectedCard.branch_name)
          ? selectedCard.branch_name
          : selectedCard.branch_name
            ? [selectedCard.branch_name]
            : [],
        device_id: selectedCard.device_id || ""
      });
    }
  }, [selectedCard]);

  // پاکسازی URL تصویر بعد از حذف
  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage]);

  // ثبت شعبه برای هر شعبه انتخاب شده
  const addBranchesForEmployee = async (deviceId, branchNames) => {
    try {
      // برای هر شعبه انتخاب شده، یک رکورد جداگانه ثبت کن
      const promises = branchNames.map(branchName =>
        createWorkerBranch({
          device_id: deviceId,
          branch_name: branchName,
        })
      );

      const results = await Promise.all(promises);

      // بررسی موفقیت همه درخواست‌ها
      const allSuccessful = results.every(res => res.status === 200);

      if (allSuccessful) {
        successToast(`شعبه‌ها با موفقیت بروزرسانی شدند (${branchNames.length} شعبه)`);
        return true;
      }
    } catch (err) {
      errorToast(`خطا در ثبت شعبه‌ها: ${err.response?.data || err.message}`);
      return false;
    }
  };

  // ثبت کارمند جدید و ثبت همزمان شعبه‌ها
  const handleSubmit = async (e) => {
    e.preventDefault();

    // بررسی اینکه حداقل یک شعبه انتخاب شده باشد
    if (!formData.branch_name || formData.branch_name.length === 0) {
      errorToast("لطفاً حداقل یک شعبه انتخاب کنید");
      return;
    }

    console.log("فرم ارسال شده:", formData);
    console.log("شعبه‌های انتخاب شده:", formData.branch_name);

    try {
      // ابتدا کارمند را ثبت کن
      const employeeData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        device_id: formData.device_id,
        // اگر API فقط یک شعبه می‌پذیرد، اولین شعبه را ارسال کن
        // یا اگر چند شعبه می‌پذیرد، کل آرایه را ارسال کن
        branch_name: formData.branch_name[0] // یا formData.branch_name بسته به API
      };

      const res = await addemployeeService(employeeData);

      if (res.status === 201) {
        successToast("کارمند با موفقیت اضافه شد");

        // سپس تمام شعبه‌های انتخاب شده را ثبت کن
        const branchSuccess = await addBranchesForEmployee(
          formData.device_id,
          formData.branch_name
        );

        if (branchSuccess) {
          // فرم را پاک کن
          setFormData({
            first_name: "",
            last_name: "",
            branch_name: [], // آرایه خالی
            device_id: ""
          });
          setSelectedImage(null);
          setSelectedId(null);
          fetchEmployees();
        }
      }
    } catch (error) {
      console.error("خطا در ارسال اطلاعات کارمند:", error);
      errorToast(`خطا در ثبت کارمند: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="p-5 bg-white border-4 shadow-lg dark:border  mb-10 dark:bg-lightgray mt-24 md:mb-5 md:-mx-4 w-full items-center rounded-3xl">
      <div dir="rtl">
        <div className="mb-5 md:flex items-center md:justify-between border-b-2 dark:border-b-darkgray border-blue">
          <div className="flex text-blue items-center dark:text-white gap-4 text-blue-700">
            <LuSquareUser size={40} />
            <p className="text-2xl dark:text-white">افزودن کارمندان</p>
          </div>
          <div className="md:flex text-blue-700 md:mt-5 -mt-10  gap-5 items-center mx-10">
            <span className="flex mb-5 gap-2 items-center dark:text-white text-blue justify-end">
              <FaRegCalendarDays />
              {getTodayJalali()}
              <ToggleButton />
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <AddEmployeeList cards={otherCards} loading={loading} onSelect={setSelectedId} />
          <AddEmployeeForm
            formData={formData}
            setFormData={setFormData}
            selectedCard={selectedCard}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleSubmit={handleSubmit}
            branches={branches}
            showSubmitButton={true}
          />
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;