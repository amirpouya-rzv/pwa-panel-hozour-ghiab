import React, { useState, useEffect } from 'react'; 
import { FaUsers } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa6';
import { CountServiceuser } from '../../services/countservices';

const StatCard = ({ icon, label, value, borderColor, borderPosition = 'right' }) => (
  <div className="relative mb-5 mt-5 flex flex-col items-center justify-center w-36 h-24 rounded-xl border border-blue dark:border-white dark:text-white text-blue shadow-md">
    <div
      className={`absolute top-2 bottom-2 w-1 rounded-full ${
        borderPosition === 'right' ? 'right-1' : 'left-1'
      }`}
      style={{ backgroundColor: borderColor }}
    ></div>
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-sm font-medium">{label}</div>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

const DashboardStats = () => {
  const [branches, setBranches] = useState(0);
  const [employees, setEmployees] = useState(0);

  const getCount = async () => {
    try {
      const res = await CountServiceuser();
      const data = res.data || res;
      setBranches(data.branch_count);
      setEmployees(data.worker_count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="flex gap-4 justify-end">
      <StatCard
        icon={<FaStore className="text-toblue" />}
        label="تعداد شعبه ها"
        value={branches}
        borderColor="#669bbc"
        borderPosition="right"
      />
      <StatCard
        icon={<FaUsers className="text-lightred" />}
        label="تعداد کارمندان"
        value={employees}
        borderColor="#c1121f"
        borderPosition="left"
      />
    </div>
  );
};

export default DashboardStats;
