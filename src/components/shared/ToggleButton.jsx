import React from 'react';
import { FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/theme/darkmodeslice';
import { MdOutlineWbSunny } from 'react-icons/md';

function ToggleButton() {
  const { darkmode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(darkmode === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        group
        flex items-center justify-center
         hover:scale-110 px-5
        transition-all duration-500
      "
    >
      <MdOutlineWbSunny 
        className={`
          ${darkmode === "dark" ? "text-yellow-300" : "text-yellow-500"}
          transition-transform duration-700
          group-hover:rotate-[360deg]
        `}
        size={22}
      />
    </button>
  );
}

export default ToggleButton;
