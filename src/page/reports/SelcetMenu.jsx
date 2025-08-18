import React, { useEffect, useState } from 'react';
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import FilterDate from './filters/FilterDate';
import FilterBranch from './filters/FilterBranch';
import FilterTime from './filters/FilterTime';
import { getTodayJalali } from '../../utils/dateutils';
import { from } from 'jalali-moment';
import ToggleButton from '../../components/shared/ToggleButton';


const SelcetMenu = ({selectFiter}) => {
  const[filters,setFilters]=useState(null)
  const[date,setDate]=useState(null)
  const[branch,setBranch]=useState(null)
  const[time,setTime]=useState(null)

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  useEffect(()=>{
    
    let item={
     
      "branch_name":branch?.name,
      "time_range":time,
    
    }
    if(date?.from && date?.to){
      item={
        "branch_name":branch?.name,
        "time_range":time,
        "start_datetime":formatDate(date?.from),
          "end_datetime":formatDate(date?.to)
      }
     
    }
    selectFiter(item)
  },[date,time,branch])
  return (
    <div className='flex w-full flex-col md:flex-row gap-3 md:gap-9 items-center justify-between p-4 border-b-2 border-toblue dark:border-white  mb-100 text-[12px]'>
      <span className='flex items-center dark:text-white gap-2 text-blue'>
        <IoStatsChartSharp size={28} />
        <p className='text-[25px] dark:text-white'>گزارشات</p>
      </span>

      <FilterDate selectDate={setDate} />
      <FilterBranch selectBranch={setBranch} />
      <FilterTime selectTime={setTime} />

      <span className='flex items-center dark:text-white gap-2'>
        <MdOutlineCalendarMonth />
        {getTodayJalali()}
        <ToggleButton/>
      </span>
    </div>
  );
};

export default SelcetMenu;
