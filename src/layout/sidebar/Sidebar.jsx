import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import { LuSquareUser, LuUserSearch } from 'react-icons/lu';
import { IoStatsChartSharp } from 'react-icons/io5';
import { BiExit } from 'react-icons/bi';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';
import ConfirmModal from '../../components/ConfirmModal';

function Sidebar() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirmExit = () => {
        setShowModal(false);
        navigate("/auth/login");
        localStorage.removeItem("authTokens")
    };

    const handleCancelExit = () => {
        setShowModal(false);
    };

    return (
        <section
            id="sidebar"
            className="fixed right-0 opacity-90 md:top-1 h-36 w-screen md:w-28 md:h-screen bg-gradient-to-l from-toblue to-blue 
                md:rounded-tl-[88.5px] dark:bg-gradient-to-l dark:from-dark_background dark:bg-[#3E3E3E]/80 dark:text-[#fdf0d5]/20 
      md:rounded-bl-[88.5px] bottom-0 mt-10 md:mt-0"
        >
            <ul className="md:space-y-8 md:mt-10 md:mx-5 flex md:flex-col justify-around">
                <SideBarItem to="/" title="کارمندان" Icon={<LuUserSearch size={40} />} />
                <SideBarItem to="/addemployee" title="افزودن" Icon={<LuSquareUser size={40} />} />
                <SideBarItem to="/reports" title="گزارشات" Icon={<IoStatsChartSharp size={40} />} />
                <SideBarItem to="/branch" title="شعبه" Icon={<MdOutlineAddLocationAlt size={40} />} />
                <div
                    onClick={handleLogoutClick}>
                    <SideBarItem title="خروج" Icon={<BiExit size={40} />} />
                </div>
            </ul>

            <ConfirmModal
                isOpen={showModal}
                onConfirm={handleConfirmExit}
                onCancel={handleCancelExit}
                title="آیا از خروج مطمئن هستید؟"
                confirmText="خروج"
                cancelText="انصراف"
            />
        </section>
    );
}

export default Sidebar;
