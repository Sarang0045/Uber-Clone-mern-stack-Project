import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Pages/start";
import UserLogin from "./Pages/userLogin";
import UserSignup from "./Pages/userSignUp";
import Captainlogin from "./Pages/captionLogin";
import CaptainSignup from "./Pages/captainSignUp";
import Home from "./Pages/home";
import UserContext from "./Context/UserContext";
import UserProtectedWaper from "./Pages/userProtectedWaper";
import CaptainProtectWraper from "./Pages/captainProtectWraper";
import UserLogout from "./Pages/userLogout";
import CaptainContext from "./Context/CaptainContext";
import CaptainHome from "./Pages/captainHome";
import CaptainLogout from "./Pages/captainLogout";
import Riding from "./Pages/riding";
import CaptainRiding from "./Pages/captainRiding";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CaptainContext>
      <UserContext>
        <div>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/riding" element={<Riding />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/captain-login" element={<Captainlogin />} />
            <Route path="/captain-signup" element={<CaptainSignup />} />
            <Route
              path="/home"
              element={
                <UserProtectedWaper>
                  <Home />
                </UserProtectedWaper>
              }
            />
            <Route
              path="/logout"
              element={
                <UserProtectedWaper>
                  <UserLogout />
                </UserProtectedWaper>
              }
            />
            <Route
              path="/captain-home"
              element={
                <CaptainProtectWraper>
                  <CaptainHome />
                </CaptainProtectWraper>
              }
            />
            <Route
              path="/captain-logout"
              element={
                <CaptainProtectWraper>
                  <CaptainLogout />
                </CaptainProtectWraper>
              }
            />
            <Route path="/captain-riding" element={<CaptainRiding />} />
          </Routes>
          <ToastContainer />
        </div>
      </UserContext>
    </CaptainContext>
  );
};

export default App;
