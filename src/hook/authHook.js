import axios from "axios";
import { errorToast } from "../utils/toastutils";
import { useEffect, useState } from "react";

export const useIsLogin = () => {
   const [islogin, setIsLogin] = useState(false)
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
        if (authTokens) {
            axios.get("worker/login")
                .then(res => {
                    setIsLogin(res.status === 200 ? true : false)
                    setIsLoading(false)
                }

                )
                .catch(err => {
                    errorToast(err.response?.data?.message)
                    localStorage.removeItem('authTokens')
                    setIsLoading(false)
                    setIsLogin(false)
                })
        } else {
            setIsLoading(false)
            setIsLogin(false)
        }
    }, [])
    

    return [isloading,islogin]
};
