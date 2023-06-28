import { useNavigate } from "react-router-dom";
import { Auth } from "./Authentication";

export default function RoleHandler() {
  const auth = Auth()
  const navigator = useNavigate()
  if (auth.admin) {
    return navigator('/admin', {replace : true})
  }

  return auth.user && navigator('/datacreate', {replace : true})
}
