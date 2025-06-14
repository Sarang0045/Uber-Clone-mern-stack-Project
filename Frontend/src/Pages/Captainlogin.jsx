import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { toast } from "react-toastify";

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setCaptain } = React.useContext(CaptainDataContext) || {};

  const submitHandler = (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log("[CaptionLogin] Captain logged in successfully:", data);
          setCaptain(data.captain);
          localStorage.setItem("captainToken", data.token);
          localStorage.removeItem("userToken"); // Ensure only one is logged in
          toast.success("Captain login successful!");
          navigate("/captain-home");
        }
      })
      .catch((error) => {
        toast.error("Captain login failed! Please check your credentials.");
        console.error("[CaptionLogin] Error logging in captain:", error);
      });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 min-h-screen flex flex-col justify-between overflow-y-auto">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
