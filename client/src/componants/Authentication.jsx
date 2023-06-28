import { createContext, useContext, useEffect, useState } from "react"
import {  baseUrl } from "../assets/Helper"
import { useNavigate } from "react-router-dom"

const authProvider = createContext(null)

export const Authentication =({children})=> {
const [user, setUser] = useState(false)
const [admin, setAdmin] = useState(false)
const Url = baseUrl
const token = localStorage.getItem('token')
const navigator = useNavigate()

useEffect(()=>{

if (token === null || undefined) {
    localStorage.removeItem("token")
    navigator('/')

} else {
    const fetchingAuth = async()=>{

        await fetch(Url + "user/auth", {
            method : "get",
            headers : {"content-type" : "application/json", "KN_HEADER" : token}
        })
        .then(res =>res.json())
        
        .then(data =>{
            if (data.success) {
                if (data.checkuser.user_role === "user") {
                    setUser(true)
                } else if(data.checkuser.user_role === "admin") {
                    setAdmin(true)
                }else{
                    setAdmin(false)
                    setUser(false)
                }
            } else {
                setAdmin(false)
                setUser(false)
                localStorage.removeItem('token')
            }
        })
    }
    fetchingAuth()
}
}, [Url])
 
    return (
        <authProvider.Provider value={{user, admin}}>{children}</authProvider.Provider>
  )
}
export const Auth =()=>{
    return useContext(authProvider)
}
