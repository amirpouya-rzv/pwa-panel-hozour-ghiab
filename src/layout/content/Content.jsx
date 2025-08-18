import React from 'react'
import { Route, Routes } from 'react-router'
import Employee from '../../page/employee/Employee'
import AddEmployee from '../../page/addemployee/AddEmployee'
import Reports from '../../page/reports/Reports'
import Branch from '../../page/branch/Branch'
import ToggleButton from '../../components/shared/ToggleButton'

function Content() {
    return (
        <section id="content" className=" -mt-6 inset-y-0 w-full h-screen bg-white dark:bg-gradient-to-b dark:from-dark_background dark:to-to_dark_background">
            <div className='absolute w-full md:pr-60  '>

              
                <Routes>

                    <Route path='/' element={<Employee />} />
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/addemployee' element={<AddEmployee />} />
                    <Route path='*' element={<Employee />} />
                    <Route path='/branch' element={<Branch />} />
                </Routes>
            </div>
        </section>
    )
}

export default Content