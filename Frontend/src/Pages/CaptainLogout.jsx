import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        localStorage.removeItem("captainToken");
        toast.success("Captain logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        localStorage.removeItem("captainToken");
        toast.success("Captain logged out successfully!");
        navigate("/login");
      });
  }, [navigate, token]);

  return <div>captain Logging out...</div>;
};

export default CaptainLogout;
