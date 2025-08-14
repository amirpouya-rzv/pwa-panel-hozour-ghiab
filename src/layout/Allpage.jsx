import React from 'react'
import { ToastContainer } from 'react-toastify'
import Sidebar from './sidebar/SideBar'
import Content from './content/Content'
import { Navigate } from 'react-router'
import { useIsLogin } from '../hook/authHook'
import PWAInstallPrompt from '../components/PWAInstallPrompt'
import SwDev from '../SwDev'

function AllPage() {

    const [isloading, islogin] = useIsLogin()

    return (
        <div>
            <ToastContainer />
            {
                isloading ? (
                    <h1>please wait...</h1>
                ) : islogin ? (
                    <div>
                        <PWAInstallPrompt />

                        <SwDev />
                        <Content />
                        <Sidebar />
                        {/* <ToastContainer stacked={true} /> */}
                    </div>
                ) : (
                    <Navigate to={"/auth/login"} />
                )
            }



        </div>

    )
}

export default AllPage