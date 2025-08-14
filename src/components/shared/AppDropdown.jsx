import React, { useRef, useEffect } from 'react';
import { TiTickOutline } from 'react-icons/ti';
import { FaFilter } from 'react-icons/fa';

const AppDropdown = ({
  options = [],
  selectedId = null,
  onChange = () => {},
  open = false,
  onToggle = () => {},
  filterLabel = 'فیلتر بر اساس زمان',
  placeholder = 'انتخاب نشده',
  className = "",
  showFilterLabel = true,   
}) => {
  const dropdownRef = useRef(null);

  // بستن منو در صورت کلیک بیرون (اطلاع به والد از طریق onToggle(false))
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (open) {
          onToggle(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onToggle]);

  const selectedOption = options.find(opt => opt.id === selectedId);

  return (
      <div
      ref={dropdownRef}
      className={`relative inline-block  ${className}`}
    >
      <div
        className="flex cursor-pointer select-none"
        onClick={() => onToggle(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(!open);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center  bg-white text-gray-800 border dark:text-darkgray border-blue dark:border-darkgray border-l-0 min-w-[140px] justify-center md:px-0 md:mb-0 px-28 mb-2 py-1 h-[30px] ">
          {selectedOption?.label || placeholder}
        </div>

        {showFilterLabel && (
          <div className="flex items-center rounded-l-sm gap-2 px-1 py-1 bg-blue text-white border border-blue dark:border-darkgray hover:bg-toblue transition h-[30px] text-[10px] dark:bg-darkgray">
            {filterLabel}
            <FaFilter />
          </div>
        )}

      </div>


      {open && (
        <div
          className="absolute mt-2 w-full rounded-md bg-white shadow-md border border-blue dark:border-darkgray z-20"
          role="listbox"
          tabIndex={-1}
        >
          <ul className="max-h-60 overflow-auto divide-y divide-slate-200">
            {options.map(({ id, label }) => (
              <li
                key={id}
                onClick={() => onChange(id)}
                className="flex flex-row-reverse items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50  text-gray"
                role="option"
                aria-selected={id === selectedId}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onChange(id);
                  }
                }}
              >
                <div
                  className={`w-5 h-5 rounded-sm flex items-center justify-center border-2  ${
                    id === selectedId
                      ? 'border-green-500 text-green-600'
                      : 'border-gray-400 text-gray-400'
                  }`}
                >
                  {id === selectedId && <TiTickOutline className="w-4 h-4" />}
                </div>
                <span className="select-none">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppDropdown;
