import { Auth } from "./Authentication"
import { useNavigate } from "react-router-dom"

export const AuthCheckUser =({children})=> {
    const auth = Auth()
    const navigator = useNavigate()
  return (
     auth.user ? children : navigator('/no-auth')
  )
}

export const AuthCheckAdmin =({children})=> {
    const auth = Auth()
    const navigator = useNavigate()
  return (
     auth.admin ? children : navigator('/no-auth')
  )
}

