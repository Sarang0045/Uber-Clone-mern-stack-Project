import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWraper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default CaptainProtectWraper;
