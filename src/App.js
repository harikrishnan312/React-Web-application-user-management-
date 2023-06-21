// import React, { useState, useEffect } from "react";
import "./App.css";

import Login from "./Pages/User/Login/Login";
import SignUp from "./Pages/User/signUp/SignUp";
import Home from "./Pages/User/Home/Home";
import Profile from "./Pages/User/Profile/Profile";
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin";
import Admin from "./Pages/Admin/AdminHome/Admin";
import UserEdit from './Pages/Admin/userEdit/UserEdit'
import Edit from "./Pages/User/Edit/Edit";
import CreateUser from './Pages/Admin/CreateUser/CreateUser'
import RequireAuth from "./Auth/RequireAuth";
import RequireAdmin from './Auth/RequireAdmin';
import UnAuthorised from "./Auth/UnAuthorised";
import AdminUnAuthorised from "./Auth/AdminUnAuthorised";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";

function App() {
  // const [message, setMessage] = useState("");


  return <div>
    <Router>
      <Routes>
        <Route element={<UnAuthorised />}>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Login />} path="/login"></Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<Home />} exact path="/"></Route>
          <Route element={<Profile />} path='/profile'></Route>
          <Route element={<Edit />} path="/edit"></Route>
        </Route>
        <Route element={<AdminUnAuthorised />}>
          <Route element={<AdminLogin />} path='/admin-login'></Route>
        </Route>
        <Route element={<RequireAdmin />}>
          <Route element={<Admin />} path='/admin-home'></Route>
          <Route element={<UserEdit />} path="/admin-user"></Route>
          <Route element={<CreateUser />} path='/admin-createuser'></Route>
        </Route>

      </Routes>
    </Router>

  </div>


}

export default App