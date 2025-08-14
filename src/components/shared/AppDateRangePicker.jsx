import React, { useRef, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import moment from 'jalali-moment';
import { convertMiladi2Jalali } from '../../utils/dateutils'; // مسیر درست را تنظیم کن

moment.locale("fa");

const AppDateRangeDropdown = ({
    fromDate,
    toDate,
    onDateChange = () => {},
    open = false,
    onToggle = () => {},
    filterLabel = 'فیلتر بر اساس تاریخ',
    placeholder = 'انتخاب نشده',
    className = '',
    showFilterLabel = true,
    button,
    footer = null // ✅ پراپس جدید برای دکمه سفارشی
}) => {
    const dropdownRef = useRef(null);
    const [fromParts, setFromParts] = useState({ day: '', month: '', year: '' });
    const [toParts, setToParts] = useState({ day: '', month: '', year: '' });

    useEffect(() => {
        if (fromDate) {
            const m = moment(fromDate).locale('fa');
            setFromParts({
                day: Number(m.format('jD')),
                month: Number(m.format('jM')),
                year: Number(m.format('jYYYY')),
            });
        } else {
            setFromParts({ day: '', month: '', year: '' });
        }
    }, [fromDate]);

    useEffect(() => {
        if (toDate) {
            const m = moment(toDate).locale('fa');
            setToParts({
                day: Number(m.format('jD')),
                month: Number(m.format('jM')),
                year: Number(m.format('jYYYY')),
            });
        } else {
            setToParts({ day: '', month: '', year: '' });
        }
    }, [toDate]);

    const buildDate = ({ day, month, year }) => {
        if (!day || !month || !year) return null;
        const jalaliString = `${year}/${month}/${day}`;
        const m = moment.from(jalaliString, 'fa', 'jYYYY/jM/jD');
        return m.isValid() ? m.toDate() : null;
    };

    const handleFromChange = (field, value) => {
        const newFromParts = { ...fromParts, [field]: Number(value) };
        setFromParts(newFromParts);
        const newFromDate = buildDate(newFromParts);
        onDateChange({ from: newFromDate, to: toDate });
    };

    const handleToChange = (field, value) => {
        const newToParts = { ...toParts, [field]: Number(value) };
        setToParts(newToParts);
        const newToDate = buildDate(newToParts);
        onDateChange({ from: fromDate, to: newToDate });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (open) onToggle(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onToggle]);

    const displayLabel =
        fromDate && toDate
            ? `${convertMiladi2Jalali(fromDate)} - ${convertMiladi2Jalali(toDate)}`
            : placeholder;

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentJalaliYear = Number(moment().locale('fa').format('jYYYY'));
    const years = Array.from({ length: 35 }, (_, i) => currentJalaliYear - 10 + i);

    return (
        <div
            ref={dropdownRef}
            className={`relative inline-block min-w-[200px] text-[12px] w-full ${className}`}
            style={{ maxWidth: 320 }}
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
                <div className="flex items-center bg-white text-gray-800 border border-blue dark:border-darkgray border-l-0 md:min-w-[200px] min-w-[283px] pb-2 justify-center px-4 -mx-2 py-2 w-full">
                    {displayLabel}
                </div>

                {showFilterLabel && (
                    <div className="flex items-center rounded-l-sm gap-2 px-2 py-1 bg-blue  dark:bg-darkgray  text-white border border-blue dark:border-darkgray hover:bg-toblue transition">
                        {filterLabel}
                        <FaFilter />
                    </div>
                )}
            </div>

            {open && (
                <div className="absolute mt-2 w-full rounded-md bg-white shadow-md border dark:border-darkgray border-blue z-20 p-3" role="listbox">
                    {/* از تاریخ */}
                    <div className="flex flex-col gap-1 text-right mb-3">
                        <label className="text-sm font-medium flex text-[11px] text-gray">
                            <span className='text-blue dark:text-darkgray'>از</span>
                            <span className='px-5 text-[#7A7A7A]'>روز</span>
                            <span className='px-16 text-[#7A7A7A]'>ماه</span>
                            <span className='px-5 text-[#7A7A7A]'>سال</span>
                        </label>
                        <div className="flex gap-5 justify-center">
                            <select className="border border-blue dark:border-darkgray rounded px-4 py-1 text-sm" value={fromParts.day || ''} onChange={(e) => handleFromChange('day', e.target.value)}>
                                <option value=""></option>
                                {days.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <select className="border border-blue dark:border-darkgray rounded px-4 py-1 text-sm" value={fromParts.month || ''} onChange={(e) => handleFromChange('month', e.target.value)}>
                                <option value=""></option>
                                {months.map((m) => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select className="border border-blue dark:border-darkgray rounded px-2 py-1 text-sm" value={fromParts.year || ''} onChange={(e) => handleFromChange('year', e.target.value)}>
                                <option value=""></option>
                                {years.map((y) => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* تا تاریخ */}
                    <div className="flex flex-col gap-1 text-right">
                        <label className="text-sm font-medium flex text-[11px] text-gray">
                            <span className='text-blue dark:border-darkgray dark:text-darkgray'>تا</span>
                            <span className='px-5 text-[#7A7A7A]'>روز</span>
                            <span className='px-16 text-[#7A7A7A]'>ماه</span>
                            <span className='px-5 text-[#7A7A7A]'>سال</span>
                        </label>
                        <div className="flex gap-5 justify-center">
                            <select className="border border-blue dark:border-darkgray rounded px-4 py-1 text-sm" value={toParts.day || ''} onChange={(e) => handleToChange('day', e.target.value)}>
                                <option value=""></option>
                                {days.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <select className="border border-blue dark:border-darkgray rounded px-4 py-1 text-sm" value={toParts.month || ''} onChange={(e) => handleToChange('month', e.target.value)}>
                                <option value=""></option>
                                {months.map((m) => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select className="border border-blue dark:border-darkgray rounded px-2 py-1 text-sm" value={toParts.year || ''} onChange={(e) => handleToChange('year', e.target.value)}>
                                <option value=""></option>
                                {years.map((y) => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* ✅ محتوای سفارشی پایین */}
                    {footer && <div className="pt-2 mt-2">{footer}</div>}
                </div>
            )}
        </div>
    );
};

export default AppDateRangeDropdown;
