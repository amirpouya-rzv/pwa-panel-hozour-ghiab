import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import { LuSquareUser, LuUserSearch } from 'react-icons/lu';
import { IoStatsChartSharp, IoClose } from 'react-icons/io5';
import { BiExit, BiMenu } from 'react-icons/bi';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import ConfirmModal from '../../components/ConfirmModal';
import ToggleButton from '../../components/shared/ToggleButton';

function Sidebar() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleConfirmExit = () => {
        setShowModal(false);
        navigate("/auth/login");
        localStorage.removeItem("authTokens");
    };

    const handleCancelExit = () => {
        setShowModal(false);
    };

    return (
      <section
    id="sidebar"
    className={`fixed inset-y-0 right-0 border-l-2 border-toblue shadow-lg bg-blue dark:bg-dark_background 
        transition-all 
        ${openMenu ? "w-96 md:w-64" : "w-0 md:w-52"}`}
>
    {/* Overlay موبایل */}
    {openMenu && (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={handleOpenMenu} 
        ></div>
    )}

    <div className="flex justify-end pt-6 px-11 md:hidden z-20 relative">
        {openMenu ? (
            <button className='text-white -mx-5' onClick={handleOpenMenu}>
                <IoClose size={25} />
            </button>
        ) : (
            <button onClick={handleOpenMenu}>
                <BiMenu size={25} />
            </button>
        )}
    </div>

    <ul onClick={handleOpenMenu} className={`${openMenu ? "block " : "hidden"} md:block mt-10 space-y-12 z-20 relative`}>
        <Link to={"/"}>
            <img src='/96_x_96-removebg-preview.png' className='md:mx-8 mx-32 rounded-xl backdrop-blur-md cursor-pointer'/>
        </Link>

        <li>
            <SideBarItem to="/" title="کارمندان" Icon={<LuUserSearch size={25} />} />
        </li>
        <li>
            <SideBarItem to="/addemployee" title="افزودن" Icon={<LuSquareUser size={25} />} />
        </li>
        <li>
            <SideBarItem to="/reports" title="گزارشات" Icon={<IoStatsChartSharp size={25} />} />
        </li>
        <li>
            <SideBarItem to="/branch" title="شعبه" Icon={<MdOutlineAddLocationAlt size={25} />} />
        </li>
        <li onClick={handleLogoutClick}>
            <SideBarItem title="خروج" Icon={<BiExit size={25} />} />
        </li>
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
