import React, { useState, useRef, useEffect } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { errorToast } from "../../utils/toastutils";

const CustomSelect = ({ options = [], value = [], onChange }) => {


  const [open, setOpen] = useState(false);
  const [selectedValues,setSelectedValues]=useState([])

  const dropdownRef = useRef(null);

  useEffect(()=>{
    
    open && setSelectedValues( Array.isArray(value) ? value : []);
   
  },[open])
  // اگر value آرایه نباشه، تبدیلش کن به آرایه (برای اطمینان)
  


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        
        setOpen(false);

      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => {setOpen(!open) };

  // وقتی گزینه ای انتخاب یا حذف میشه
  const handleSelect = (val) => {
    let newValues;
  
    if (selectedValues?.includes(val)) {
      // حذف گزینه از آرایه
      newValues = selectedValues.filter((v) => v !== val);
      if(newValues?.length==0){
        return
      }

    } else {
      // اضافه کردن گزینه به آرایه
      if(!selectedValues?.includes(val)){
        newValues = [...selectedValues, val];
      }
     
    }
   
      onChange(newValues);
      setSelectedValues(newValues)
    
    

  };



  // برای نمایش متن باکس، چند حالت:
  // - اگر هیچ انتخابی نیست => "انتخاب کنید"
  // - اگر 1 تا انتخاب هست => اسم آن
  // - اگر بیشتر از 1 انتخاب هست => مثلا "3 گزینه انتخاب شده"
  const selectedLabels = options
    .filter((opt) => selectedValues?.includes(opt.value))
    .map((opt) => opt.label);

  const displayText =
    selectedLabels.length === 0
      ? "انتخاب کنید"
      : selectedLabels.length === 1
        ? selectedLabels[0]
        : `${selectedLabels.length} گزینه انتخاب شده`;

  return (
    <div className="relative w-full" ref={dropdownRef} dir="rtl">
      {/* Box */}
      <div
        onClick={toggleOpen}
        className="flex justify-between items-center border-2 border-blue dark:border-darkgray rounded-lg bg-white px-4 py-2.5 cursor-pointer text-base"
      >
        <span className="text-gray-700">{displayText}</span>
        {open ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute top-full mt-1 w-full border-[1.5px] border-blue dark:border-darkgray rounded-xl bg-white shadow-md z-10 max-h-60 overflow-y-auto text-base">
          {options.length === 0 ? (
            <li className="px-4 py-2 text-gray-500">گزینه‌ای موجود نیست</li>
          ) : (
            options.map((opt) => {
              const isSelected = selectedValues?.includes(opt.value);
              return (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-blue-50 ${isSelected ? "bg-blue-100 text-red-500 font-semibold" : ""
                    }`}
                >
                  <span>{opt.label}</span>
                  {isSelected ? (
                    <FaCheckSquare className="text-green-600  text-lg" />
                  ) : (
                    <FaRegSquare className="text-gray-400 text-lg" />
                  )}

                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
