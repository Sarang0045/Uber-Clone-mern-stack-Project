import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import LiveTracking from "../Components/liveTracking";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });
    return () => {
      socket.off("ride-ended");
    };
  }, [socket, navigate]);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 z-10">
      <div className="fixed left-4 top-4 z-20">
        <Link
          to="/home"
          className="h-12 w-12 bg-white shadow-lg flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition"
        >
          <i className="text-2xl font-medium ri-home-5-line"></i>
        </Link>
      </div>
      {/* LiveTracking takes 60% of the screen height */}
      <div
        className="w-full"
        style={{
          height: "65vh",
          minHeight: "200px",
          flexShrink: 0,
        }}
      >
        <LiveTracking />
      </div>
      {/* Ride info takes 40% of the screen height */}
      <div
        className="flex-1 bg-white rounded-t-3xl shadow-lg z-10 relative p-6 overflow-y-auto"
        style={{ minHeight: "40vh" }}
      >
        <div className="flex items-center justify-between mb-4">
          <img
            className="h-14 w-14 rounded-full object-cover border-2 border-yellow-400"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="captain"
          />
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-900">
              {ride?.captain?.fullname?.firstname}{" "}
              {ride?.captain?.fullname?.lastname}
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-gray-700 text-base font-medium">
                {ride?.captain?.vehicle?.plate}
              </span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-2">
                {ride?.captain?.vehicle?.type}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <i className="ri-map-pin-2-fill text-blue-600 text-xl"></i>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {(() => {
                  if (!ride?.pickup) return "-";
                  const commaIdx = ride.pickup.indexOf(",");
                  if (commaIdx !== -1) {
                    return ride.pickup.slice(0, commaIdx);
                  }
                  const words = ride.pickup.trim().split(/\s+/);
                  return words.slice(0, 2).join(" ");
                })()}
              </h3>
              <p className="text-sm text-gray-500">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <i className="ri-currency-line text-yellow-600 text-xl"></i>
            <div className="flex justify-between w-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  ₹{ride?.fare}
                </h3>
                <p className="text-sm text-gray-500">Cash</p>
              </div>
              <div>
                <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold p-2 rounded-lg text-lg shadow transition">
                  Payment Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
