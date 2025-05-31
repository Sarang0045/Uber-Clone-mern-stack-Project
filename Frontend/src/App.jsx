import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Pages/Start";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignUp";
import Captainlogin from "./Pages/CaptionLogin";
import CaptainSignup from "./Pages/CaptainSignUp";
import Home from "./Pages/home";
import UserContext from "./Context/UserContext";
import UserProtectedWaper from "./Pages/UserProtectedWaper";
import CaptainProtectWraper from "./Pages/CaptainProtectWraper";
import UserLogout from "./Pages/UserLogout";
import CaptainContext from "./Context/CaptainContext";
import CaptainHome from "./Pages/CaptainHome";
import CaptainLogout from "./Pages/CaptainLogout";

const App = () => {
  return (
    <CaptainContext>
      <UserContext>
        <div>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
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
          </Routes>
        </div>
      </UserContext>
    </CaptainContext>
  );
};

export default App;
