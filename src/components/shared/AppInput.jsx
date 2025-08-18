import React from 'react';
import { FiSearch } from 'react-icons/fi'; // نمونه آیکون

function AppInput({
    title,
    id,
    value,
    onChange,
    className = '',
    type = 'text',
    placeholder = '',
    error = '',
    icon = null,
    onButtonClick = null,
    buttonLabel = '',
    horizontal = false,
}) {
    return (
        <div className={`w-full ${horizontal ? 'flex items-center gap-4' : 'flex flex-col gap-1'}`}>
            {title && (
                <label
                    htmlFor={id}
                    className={`text-gray-700 dark:text-white font-medium text-lg ${horizontal ? 'whitespace-nowrap min-w-2 text-right' : 'mb-1'}`}
                >
                    {title}
                </label>
            )}

            <div className="relative w-full">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    id={id}
                    value={value ?? ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full py-3  pr-4 ${icon ? 'pl-10' : 'pl-4'} rounded-xl border-2 ${error ? 'border-red-500' : 'dark:border-stone-300 border-stone-300 dark:border dark:border-white'
                        } focus:ring-1 focus:outline-none focus:ring-blue dark:focus:ring-dark_background ${className}`}
                />


                {onButtonClick && (
                    <button
                        type="button"
                        onClick={onButtonClick}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-blue text-white rounded hover:bg-blue"
                    >
                        {buttonLabel}
                    </button>
                )}
            </div>

            {!horizontal && error && <span className="text-sm text-red-500 mt-1">{error}</span>}
            {horizontal && error && (
                <span className="text-sm text-red-500 mt-1 block w-full md:col-span-2">{error}</span>
            )}
        </div>
    );
}

export default AppInput;
