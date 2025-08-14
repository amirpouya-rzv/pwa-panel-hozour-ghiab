import React, { useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { TiTickOutline } from 'react-icons/ti';

const Appselect = ({
  options = [],
  selectedId = null,
  onChange = () => {},
  open = false,
  onToggle = () => {},
  placeholder = 'انتخاب نشده',
  className = "",
  wrapperClass = "",
  triggerClass = "",
  listClass = "",
  itemClass = "",
}) => {
  const dropdownRef = useRef(null);

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
    <div ref={dropdownRef} className={`relative inline-block w-full ${wrapperClass}`}>
      {/* تریگر */}
      <div
        className={`flex cursor-pointer select-none items-center justify-between 
          py-2 px-3 md:w-[190px] w-[67px] 
          bg-white text-gray-800 
          border border-blue dark:border-darkgray 
          rounded-xl text-sm
          relative
          ${triggerClass}
        `}
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
        <span className='md:pr-16'>{selectedOption?.label || placeholder}</span>

        <FiChevronDown
          className={`transition-transform duration-200 ease-in-out text-left ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          size={20}
          aria-hidden="true"
        />
      </div>

      {/* لیست گزینه‌ها */}
      {open && (
        <div
          className={`
            absolute mt-1 w-full 
            rounded-md bg-white 
            shadow-lg border border-blue dark:border-darkgray z-20
            text-gray text-center
            ${listClass}
          `}
          role="listbox"
          tabIndex={-1}
        >
          <ul className="max-h-60 overflow-auto divide-y divide-slate-200">
            {options.map(({ id, label }) => (
              <li
                key={id}
                onClick={() => onChange(id)}
                className={`
                  flex flex-row-reverse items-center justify-between 
                  gap-3 px-4 py-2 
                  cursor-pointer hover:bg-blue-50 
                  text-sm text-gray text-center
                  ${itemClass}
                `}
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
                  className={`
                    w-5 h-5 rounded-sm flex text-gray items-center justify-center border-2 
                    ${id === selectedId
                      ? 'border-green-500  text-green-600'
                      : 'border-gray-300 text-gray-300'
                    }
                  `}
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

export default Appselect;
