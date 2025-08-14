import React, { useState } from 'react';
import AppDateDropdown from '../../../components/shared/AppDateRangePicker';
import { successToast } from '../../../utils/toastutils';
import Skeleton from 'react-loading-skeleton';


function FilterDate({ loading,selectDate }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ from: null, to: null });



  const handleSubmit = () => {
   
    setOpen(false);
    //set error handling hear
    selectDate(selectedDate)
    successToast("تاریخ مورد نظر یافت شد");
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  if (loading) {
    return (
      <div className="p-4 w-[250px]">
        <Skeleton height={40} borderRadius={8} />
      </div>
    );
  }

  const isValidRange = (selectedDate.from && selectedDate.to) ;
  const isValidRange1= (isValidRange ? formatDate(selectedDate.from) < formatDate(selectedDate.to) :false   )
  return (
    <div className="">
      <AppDateDropdown
        fromDate={selectedDate.from}
        toDate={selectedDate.to}
        onDateChange={setSelectedDate}
        open={open}
        onToggle={setOpen}
        filterLabel="تاریخ"
        placeholder="تاریخ را انتخاب کنید"
        footer={
          <button
            disabled={!isValidRange1}
            className={`px-10 mx-24 border-2 dark:border-darkgray border-green-500 text-gray mt-2 rounded hover:bg-darkblue ${!isValidRange1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
          >
            ثبت
          </button>
        }
      />
    </div>
  );
}

export default FilterDate;
