import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

// Configure axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  withCredentials: true,
  timeout: 10000,
});

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext) || {};

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await API.post("/users/login", { email, password });
      
      setUser(data.user);
      localStorage.setItem("userToken", data.token);
      localStorage.removeItem("captainToken");
      navigate("/home");
      
    } catch (err) {
      handleLoginError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (err) => {
    if (err.response) {
      setError(err.response.data.message || "Login failed");
    } else if (err.code === "ERR_NETWORK") {
      setError("Network error. Please check your connection");
    } else if (err.code === "ECONNABORTED") {
      setError("Request timeout. Please try again");
    } else {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Uber Logo"
        />

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            disabled={isLoading}
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
            disabled={isLoading}
          />

          <button
            disabled={isLoading}
            className={`bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;