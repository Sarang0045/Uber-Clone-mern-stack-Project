import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtectedWaper = ({ children }) => {
  const userToken = localStorage.getItem("userToken");
  const captainToken = localStorage.getItem("captainToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken || captainToken) {
      // If not logged in as user or logged in as captain, redirect
      navigate("/login");
    }
  }, [userToken, captainToken, navigate]);

  return <>{children}</>;
};

export default UserProtectedWaper;
