import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const AppFileInput = forwardRef(({
    title,
    id,
    onChange,
    className = '',
    accept = '',
    error = '',
    horizontal = false,
}, ref) => {
    const inputRef = useRef();

    // به والد اجازه میدیم که از بیرون ref به تابع reset دسترسی داشته باشه
    useImperativeHandle(ref, () => ({
        reset: () => {
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }));

    return (
        <div className={`w-full ${horizontal ? 'flex items-center gap-4' : 'flex flex-col gap-1'}`}>
            {title && (
                <label
                    htmlFor={id}
                    className={`text-gray-700 font-medium ${horizontal ? 'whitespace-nowrap min-w-24 text-right' : 'mb-1'}`}
                >
                    {title}
                </label>
            )}

            <div className="relative w-full">
                <input
                    ref={inputRef}
                    type="file"
                    id={id}
                    onChange={onChange}
                    accept={accept}
                    className={`block w-full  text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-xl  file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue file:text-toblue
                        hover:file:bg-blue-100
                        ${className}
                    `}
                />
            </div>

            {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
        </div>
    );
});

export default AppFileInput;
