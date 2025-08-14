import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'

function LogOut() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('worker/login')
            .then(res => {
                localStorage.removeItem("authTokens")
                setLoading(false)
            })
    }, [])

    return (
        <div>
            {
                loading ?
                    (
                        <h1>please waite .....</h1>
                    ) :
                    (
                        <Navigate to={'/auth/login'} />
                    )
            }
        </div>
    )
}

export default LogOut