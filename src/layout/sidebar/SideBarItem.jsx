import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarItem = ({ Icon, title, to, onClick }) => {
    const content = (
        <div className="flex px-10  justify-between gap-4 text-xl items-center ">
            {Icon}
            {title}
        </div>
    );

    return (
        <li className='flex justify-center items-center text-white pt-5'>
            {to ? (
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `grid gap-3 items-center justify-center text-center transition-all rounded-2xl hover:bg-white/20  hover:py-1 ${
                            isActive ? "text-white bg-white/20 border-y-2 border-toblue  dark:text-white" : ""
                        }`
                    }
                >
                    {content}
                </NavLink>
            ) : (
                <button
                    onClick={onClick}
                    className="grid gap-3 hover:py-1 items-center justify-center text-center transition-all px-2 rounded-2xl hover:bg-white/20"
                >
                    {content}
                    
                </button>
            )}
        </li>
    );
};

export default SideBarItem;
