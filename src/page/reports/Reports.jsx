import React, { useEffect, useState } from 'react';
import SelcetMenu from './SelcetMenu';
import Counts from '../counts/Counts';
import Appselect from '../../components/shared/Appselect';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getReport,changeCode } from '../../services/report';
import {convertMiladi2Jalali} from "../../utils/dateutils"

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params,serParams]=useState(null)
  

  const options = [
    { id: 0,label:'بدون وضعیت'},
    { id: 2, label: 'عالی' },
    { id: 1, label: 'متوسط' },
    { id: -1, label: 'کم‌تر از انتظار' }, 
  ];

  const [selectedItems, setSelectedItems] = useState({id:null,admin_code:null});
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const getBackGroundColor = (admin_code) => {
    switch (admin_code) {
      case -1:
        return 'bg-[#FFD7D7]';   // کمتر از حد انتظار
      case 2:
        return 'bg-[#C8FFCC]'; // عالی
      case 1:
        return 'bg-[#FFFBB1]'; // متوسط
      case 0:
        return 'bg-white';  
      default:
        return 'bg-white';     // Default White
    }
  };

  function convertUtcHourToTehran(utcTimeStr) {
    if(utcTimeStr){
      const [hour, minute, second] = utcTimeStr?.split(":")?.map(Number);
  
    
      const utcDate = new Date();
      utcDate.setUTCHours(hour, minute, second || 0, 0);
    
  
      const tehranTime = utcDate?.toLocaleTimeString("fa-IR", {
        timeZone: "Asia/Tehran",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    
      return tehranTime;
    }else{
      return null
    }
    
  }




  const handleGetEmployee = async () => {
    try {
      setLoading(true);
      const res = await getReport(params);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      // console.log('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSessionCode=async (id,admin_code)=>{
    try {
      setLoading(true);
      setSelectedItems({id:id,admin_code:admin_code})
      selectedItems?.admin_code 
      const data={
        admin_code:admin_code,
        id:id
      }
      const res = await changeCode(data);
      if (res.status === 200) {
        console.log(res)
        handleGetEmployee()
       
      }
    } catch (err) {
      // console.log('❌ Error:', err);
    } finally {
      setLoading(false);
    }
  }
  const handleSelectChange = (id, selectedId) => {
    
    handleAdminSessionCode(id,selectedId)
    setOpenDropdownIndex(null);
  };

  useEffect(() => {
    handleGetEmployee();
  }, [params]);

  const headColumnClass =
    'flex-1 min-w-0 text-center py-2 dark:border dark:border-darkgray text-blue dark:text-white px-2 bg-[#dcdcdc] dark:bg-darkgray rounded-md font-bold text-[14px]';

  return (
    <div className="relative dark:bg-dark_kightgray p-4 md:mt-10 mt-5 md:-mx-4 w-full mb-5 bg-white rounded-xl shadow-xl min-h-screen">
      <div className="flex justify-end">
        <SelcetMenu selectFiter={serParams} />
      </div>

      <div>
        <Counts />
      </div>

      <div className="mt-4 mb-5 overflow-x-auto md:overflow-visible">
        {loading ? (
          <div className="space-y-2">
            <div className="flex gap-x-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-0 text-center py-2 px-2 bg-gray-200 rounded-md"
                >
                  <Skeleton height={20} />
                </div>
              ))}
            </div>
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-x-4">
                {[...Array(6)].map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex-1 min-w-0 py-2 px-2 bg-gray-100 rounded-md"
                  >
                    <Skeleton height={20} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 py-10 font-semibold text-lg">
            داده‌ای وجود ندارد
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="flex gap-x-4 pb-5 border-b-2 dark:border-darkgray">
                <th className={headColumnClass}>نام و نام خانوادگی</th>
                <th className={headColumnClass}>تاریخ</th>
                <th className={headColumnClass}>ورود</th>
                <th className={headColumnClass}>خروج</th>
                <th className={headColumnClass}>شعبه</th>
                <th className={`max-w-[190px] ${headColumnClass}`}>گزارش</th>
              </tr>
            </thead>

            <tbody className="mt-2 space-y-2">
              {data.map((value, index) => {
                // Determine background color: priority to selected option
                const bgCode = selectedItems[index] ?? value.admin_code;
                const bodyColumnClass = `flex-1 min-w-0 text-center dark:border dark:border-darkgray py-2 px-2 text-gray-800 border border-blue dark:border-darkgray rounded-md ${getBackGroundColor(
                  bgCode
                )}`;

                return (
                  <tr key={value.id || index} className="flex gap-x-4 pt-2">
                    <td className={bodyColumnClass}>
                      {value.first_name} {value.last_name}
                    </td>
                    <td className={bodyColumnClass}>{convertMiladi2Jalali(value.created_at)}</td>
                    <td className={bodyColumnClass}>{convertUtcHourToTehran(value.login_time)}</td>
                    <td className={bodyColumnClass}>{convertUtcHourToTehran(value.logout_time)}</td>
                    <td className={bodyColumnClass}>{value.branch_name}</td>
                    <td >
                      <Appselect
                        options={options}
                        selectedId={selectedItems[index] || null}
                        onChange={(id) => handleSelectChange(value.id, id)}
                        open={openDropdownIndex === index}
                        onToggle={(isOpen) =>
                          setOpenDropdownIndex(isOpen ? index : null)
                        }
                        placeholder="انتخاب کنید"
                        className="w-40"
                        listClass="z-50"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;
