import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componants/Login"
import {Authentication }from "./componants/Authentication"
import { AuthCheckAdmin, AuthCheckUser } from "./componants/AuthCheck";
import DataCreate from "./componants/DataCreate"
import AdminPage from "./componants/AdminPage"
import RoleHandler from "./componants/RoleHandler";


function App() {

  return (
    <>
    <BrowserRouter>
    <Authentication>
    <Routes>
      <Route  path="/" element={<Login />}/>

      <Route path="rolehandler" element={<RoleHandler/>}/>
      
      <Route path="/datacreate" element={
        <AuthCheckUser>
          <DataCreate />
        </AuthCheckUser>
      }/>

      <Route path="/admin" element={
        <AuthCheckAdmin>
          <AdminPage />
        </AuthCheckAdmin>
      }/>
    </Routes>
    </Authentication>
    </BrowserRouter>
    </>
  );
}

export default App;
