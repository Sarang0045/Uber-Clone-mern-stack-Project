import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Pages/Start.jsx";
import UserLogin from "./Pages/userLogin.jsx";
import UserSignUp from "./Pages/UserSignUp.jsx";
import Captainlogin from "./Pages/captionLogin.jsx";
import CaptainSignup from "./Pages/captainSignUp.jsx";
import Home from "./Pages/home.jsx";
import UserContext from "./Context/UserContext.jsx";
import UserProtectedWaper from "./Pages/UserProtectedWaper.jsx";
import CaptainProtectWraper from "./Pages/captainProtectWraper.jsx";
import UserLogout from "./Pages/UserLogout.jsx";
import CaptainHome from "./Pages/captainHome.jsx";
import CaptainLogout from "./Pages/CaptainLogout.jsx";
import Riding from "./Pages/riding.jsx";
import CaptainRiding from "./Pages/captainRiding.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CaptainContext from "./Context/CaptainContext.jsx";

const App = () => {
  return (
    <CaptainContext>
      <UserContext>
        <div>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/riding" element={<Riding />} />
            <Route path="/signup" element={<UserSignUp />} />
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
