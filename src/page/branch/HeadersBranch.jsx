import React from 'react'
import { MdOutlineAddLocationAlt, MdOutlineCalendarMonth } from 'react-icons/md'
import { getTodayJalali } from '../../utils/dateutils'
import ToggleButton from '../../components/shared/ToggleButton'

function HeadersBranch() {
    return (
        <div className="py-5 md:flex items-center mt-10 justify-between border-b-2 dark:border-b dark:border-darkgray mb-10 border-toblue mx-10">
            <div className="flex dark:text-darkgray items-center gap-4 text-blue ">
                <MdOutlineAddLocationAlt size={40}/>
                <p className="text-2xl">افزودن شعبه</p>
            </div>
            <div className="flex justify-end md:-mt-0 -mt-9 text-blue  dark:text-darkgray items-center">
                <span className='flex items-center gap-1 dark:text-darkgray'>
                    <MdOutlineCalendarMonth />
                    {getTodayJalali()}
                    <ToggleButton/>
                </span>
            </div>
        </div>)
}

export default HeadersBranch