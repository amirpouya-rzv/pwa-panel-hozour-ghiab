import React, { useEffect, useState } from 'react'
import AppDropdown from '../../../components/shared/AppDropdown'
import { errorToast } from '../../../utils/toastutils'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { GetBranchList } from '../../../services/Filterservice'

function FilterBranch ({selectBranch}) {
  const [options, setOptions] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getBranches = async () => {
    try {
      const response = await GetBranchList()
      if (response.status == 200) {
    
        setOptions(
          response.data.map(p => ({
            id:{name:p.name,id:p.id},
            label: p.name,
          }))
        )
        setOptions(prevItems=>[{id:{name:"",id:""},label:"همه"},...prevItems])
      }
    } catch (error) {
      errorToast(error, "خطا در دریافت لیست شعبه")
      setError("خطا در دریافت لیست شعبه")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBranches()
  }, [])
 
  const handleDropdownChange = (id) => {
    
    setSelectedId(id)
    selectBranch(id)
    setDropdownOpen(false)
  }

  const handleToggle = (isOpen) => {
    setDropdownOpen(isOpen)
  }


  if (loading) {
    return (
      <div style={{ width: 200 }}>
        <Skeleton height={40} borderRadius={12} />
      </div>
    )
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
        placeholder="انتخاب شعبه"
      />
    </div>
  )
}

export default FilterBranch
