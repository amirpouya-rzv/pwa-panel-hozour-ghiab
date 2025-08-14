import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/theme/darkmodeslice';

function ToggleButton() {
  const { darkmode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  return (
    <div
    style={{direction:"ltr"}}
      className='
        w-full flex justify-start my-4 -mx-4
        lg:absolute lg:top-1 lg:left-0 lg:z-40 
        lg:w-36 lg:h-20 lg:justify-center lg:items-center
        lg:rounded-b-2xl 
        bg-gray-200 dark:bg-gray-800
      '
    >
      <label
        htmlFor="check"
        className='relative w-24 h-10 flex items-center px-1 cursor-pointer bg-[#D3D3D3] dark:bg-[#D3D3D3] border border-[#3E3E3E] rounded-full shadow-inner'
      >
        <input
          type='checkbox'
          id='check'
          className='sr-only peer'
          checked={darkmode === "dark"}
          onChange={(e) => dispatch(setTheme(e.target.checked ? "dark" : "light"))}
        />

        {/* دکمه گرد متحرک */}
        <span
          className='absolute top-0.5 left-1 h-8 shadow-2xl w-12 bg-[#3E3E3E] rounded-full peer-checked:left-[calc(100%-38px)] transition-all duration-300'
        ></span>

        {/* آیکون خورشید */}
        <span className='absolute left-3 z-10 text-white peer-checked:hidden'>
          <FaSun size={16} />
        </span>

        {/* آیکون ماه */}
        <span className='absolute right-3 z-10 text-white hidden peer-checked:block'>
          <FaMoon size={16} />
        </span>
      </label>
    </div>
  );
}

export default ToggleButton;
