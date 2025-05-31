import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtectedWaper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("User is not logged in or user data is not available.");
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default UserProtectedWaper;
