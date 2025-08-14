import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarItem = ({ Icon, title, to, onClick }) => {
    const content = (
        <div className="grid gap-3 items-center justify-center">
            {Icon}
            {title}
        </div>
    );

    return (
        <li className='flex md:flex-col items-center  text-white pt-5'>
            {to ? (
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `grid gap-3 items-center justify-center text-center transition-all px-2 py-1 rounded-2xl hover:bg-white/20 ${
                            isActive ? "text-blue bg-white dark:text-dark_background" : ""
                        }`
                    }
                >
                    {content}
                </NavLink>
            ) : (
                <button
                    onClick={onClick}
                    className="grid gap-3 items-center justify-center text-center transition-all px-2 py-1 rounded-2xl hover:bg-white/20"
                >
                    {content}
                </button>
            )}
        </li>
    );
};

export default SideBarItem;
