// AddEmployeeForm.jsx
import { FaUserCircle } from "react-icons/fa";
import AppInput from "../../components/shared/AppInput";
import CustomSelect from "../../components/shared/CustomSelect";
// import AppFileInput از کامپوننت‌های شما (اگر لازم بود)

function AddEmployeeForm({
  formData,
  setFormData,
  selectedCard,
  selectedImage,
  setSelectedImage,
  handleSubmit,
  branches,
}) {
  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="md:w-full grid grid-cols-1 md:grid-cols-2 dark:bg-darkgray pt-36 dark:text-black bg-white shadow p-6 rounded-lg gap-6 overflow-y-auto max-h-[90vh]"
>
  {/* نام */}
  <AppInput
    title={"نام :"}
    value={formData.first_name}
    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
  />

  {/* نام خانوادگی */}
  <AppInput
    title={"نام خانوادگی :"}
    value={formData.last_name}
    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
  />

  {/* شعبه */}
  <div className="flex flex-col">
    <span className="mb-2 text-xl text-gray-700 dark:text-white">
      شعبه (می‌توانید چند شعبه انتخاب کنید):
    </span>
    <CustomSelect
      options={branches}
      value={Array.isArray(formData.branch_name) ? formData.branch_name : []}
      onChange={(selectedBranches) =>
        setFormData({ ...formData, branch_name: selectedBranches })
      }
    />

    {/* نمایش شعبه‌های انتخاب شده */}
   {formData.branch_name && formData.branch_name.length > 0 && (
  <div className="bg-blue-50 dark:bg-darkgray p-3 rounded-lg mt-3">
    <p className="text-sm font-semibold mb-2 dark:text-white">
      شعبه‌های انتخاب شده:
    </p>
    <div className="flex flex-wrap gap-2">
      {formData.branch_name.map((branchName, index) => {
        const branchLabel =
          branches.find((b) => b.value === branchName)?.label || branchName;
        return (
          <div
            key={index}
            className="flex items-center bg-toblue text-white gap-2 dark:bg-lightgray text-blue-800 dark:text-white px-3 py-1 rounded-full text-sm shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <span className="truncate max-w-[120px]">{branchLabel}</span>
            <button
              type="button"
              className="text-xl text-lightred hover:text-darkred"
              onClick={() => {
                setFormData({
                  ...formData,
                  branch_name: formData.branch_name.filter((_, i) => i !== index)
                });
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  </div>
)}

  </div>

  {/* شناسه یکتا */}
  <div className="flex flex-col">
    <span className="mb-3 text-xl text-gray-700">
      شناسه یکتا :
    </span>
    <textarea
      className="border-2 border-blue dark:border-lightgray  rounded-xl focus:ring-0 focus:outline-none focus:ring-blue"
      value={formData.device_id || ""}
      onChange={(e) => setFormData({ ...formData, device_id: e.target.value })}
    />
  </div>

  {/* دکمه (کل عرض) */}
  <div className="col-span-1 md:col-span-2 flex justify-center mt-10">
    <button
      type="submit"
      className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-16 py-2.5 text-center me-2 mb-2"
    >
      ثبت
  
    </button>
  </div>
</form>

  );
}

export default AddEmployeeForm;