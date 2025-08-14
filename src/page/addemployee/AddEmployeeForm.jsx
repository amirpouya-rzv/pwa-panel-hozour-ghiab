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
      className="md:w-full dark:bg-darkgray pt-36 dark:text-black bg-white shadow p-6 rounded-lg flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[90vh]"
    >
      {/* فرم اطلاعات */}
      <div className="flex flex-col gap-5 w-full order-2 md:order-1">
        <AppInput
          title={"نام :"}
          horizontal
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />
        <AppInput
          title={"نام خانوادگی :"}
          horizontal
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />

        <span className="-mb-2 text-xl dark:text-lightgray">شعبه (می‌توانید چند شعبه انتخاب کنید):</span>
        <CustomSelect
          options={branches}
          value={Array.isArray(formData.branch_name) ? formData.branch_name : []}
          onChange={(selectedBranches) => 
            setFormData({ ...formData, branch_name: selectedBranches })
          }
        />

        {/* نمایش شعبه‌های انتخاب شده */}
        {formData.branch_name && formData.branch_name.length > 0 && (
          <div className="bg-blue-50 dark:bg-darkgray p-3 rounded-lg">
            <p className="text-sm font-semibold mb-2 dark:text-lightgray">شعبه‌های انتخاب شده:</p>
            <div className="flex flex-wrap gap-2">
              {formData.branch_name.map((branchName, index) => {
                const branchLabel = branches.find(b => b.value === branchName)?.label || branchName;
                return (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-lightgray text-blue-800 dark:text-darkgray px-2 py-1 rounded-full text-sm"
                  >
                    {branchLabel}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* شناسه یکتا */}
        <div className="w-full flex flex-col">
          <span className="text-center flex rounded-t-lg justify-center items-center text-white font-xl h-10 w-full bg-blue dark:bg-to_dark_background">
            شناسه یکتا :
          </span>
          <textarea
            className="border-2 border-blue dark:border-lightgray h-52 rounded-b-lg focus:ring-0 focus:outline-none focus:ring-blue"
            value={formData.device_id || ""}
            onChange={(e) => setFormData({ ...formData, device_id: e.target.value })}
          />
        </div>

        {/* اگر میخوای قابلیت آپلود عکس رو فعال کنی میتونی این بخش رو باز کنی */}
        {/* <AppFileInput
          title={"افزودن تصویر :"}
          horizontal
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              if (selectedImage) URL.revokeObjectURL(selectedImage);
              const imgURL = URL.createObjectURL(file);
              setSelectedImage(imgURL);
            }
          }}
        /> */}

        <div className="flex justify-center md:flex mb-44 md:gap-4">
          <button
            type="submit"
            className="border-4 dark:border-dark_kightgray dark:bg-lightgray dark:text-darkgray text-lg py-2 px-28 md:py-2 md:px-36 md:mx-80 rounded-md border-[#1BBF26]"
          >
            ثبت
            {formData.branch_name && formData.branch_name.length > 1 && 
              ` (${formData.branch_name.length} شعبه)`
            }
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddEmployeeForm;