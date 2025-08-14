import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Login from '../../page/auth/Login'
import { useIsLogin } from '../../hook/authHook'

function AuthLayout() {

    const [isloading, islogin] = useIsLogin()

    return (
        <div>
            {
                isloading ? (
                    <h1 className='text-center text-5xl mt-10 items-center text-red-950'>لطفا صبر کنید...</h1>
                ) : !islogin ? (
                    <div>
                        <Routes>
                            <Route path='/auth/login' element={<Login />} />
                        </Routes>
                    </div>
                ) : (
                    <Navigate to={"/"} />
                )
            }
        </div>
    )
}

export default AuthLayout