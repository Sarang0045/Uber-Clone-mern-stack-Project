import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("userToken")) {
      navigate("/logout");
    } else if (localStorage.getItem("captainToken")) {
      navigate("/captain-logout");
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="h-10 w-10 bg-white shadow-lg flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition fixed right-12 top-2 z-30"
      title="Logout"
    >
      <i className="text-2xl font-medium ri-logout-box-r-line"></i>
    </button>
  );
};

export default LogoutButton;
