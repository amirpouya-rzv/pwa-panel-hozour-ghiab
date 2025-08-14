import React, { useEffect, useState } from 'react'
import AppDropdown from '../../../components/shared/AppDropdown'
import { errorToast } from '../../../utils/toastutils'
import { GetBranchList } from '../../../services/Filterservice'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function FilterTime ({selectTime}) {
  const [options, setOptions] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    setOptions([
      { id: "", label: "همه" },
      { id: "daily", label: "روزانه" },
      { id:"weekly", label: "هفتگی" },
      { id: "monthly", label: "ماهانه" },
      { id: "yearly", label: "سالانه" },
    ]);
  }, []);

  const handleDropdownChange = (id) => {
    setSelectedId(id)
    selectTime(id)
    setDropdownOpen(false)
  }

  const handleToggle = (isOpen) => {
    setDropdownOpen(isOpen)
  }


  if (error) return <div className="text-red-500">خطا: {error}</div>

  return (
    <div>
      <AppDropdown
        options={options}
        selectedId={selectedId}
        onChange={handleDropdownChange}
        open={dropdownOpen}
        onToggle={handleToggle}
        filterLabel="فیلتر بر اساس شعبه"
        placeholder="انتخاب زمان"
      />
    </div>
  )
}

export default FilterTime
