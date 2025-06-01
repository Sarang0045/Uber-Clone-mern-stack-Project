import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWraper = ({ children }) => {
  const captainToken = localStorage.getItem("captainToken");
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!captainToken || userToken) {
      // If not logged in as captain or logged in as user, redirect
      navigate("/login");
    }
  }, [captainToken, userToken, navigate]);

  return <>{children}</>;
};

export default CaptainProtectWraper;
