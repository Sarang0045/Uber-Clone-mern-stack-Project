import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../Components/liveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const ride = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 z-10">
      <div className="fixed left-4 top-4 z-20">
        <Link
          to="/captain-home"
          className="h-12 w-12 bg-white shadow-lg flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition"
        >
          <i className="text-2xl font-medium ri-home-5-line"></i>
        </Link>
      </div>
      {/* LiveTracking takes 60% of the screen height */}
      <div
        className="w-full"
        style={{
          height: "60vh",
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
        {/* Ride/User Info Card */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="flex items-center gap-4 mb-2">
            <img
              className="h-14 w-14 rounded-full object-cover border-2 border-yellow-400"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&s"
              alt="user"
            />
            <div>
              <div className="text-xl font-bold">
                {ride?.user?.fullname?.firstname}{" "}
                {ride?.user?.fullname?.lastname}
              </div>
              <div className="text-gray-700 text-base">
                <i className="ri-map-pin-user-fill text-sm"></i>{" "}
                {(() => {
                  if (!ride?.pickup) return "-";
                  const commaIdx = ride.pickup.indexOf(",");
                  if (commaIdx !== -1) {
                    return ride.pickup.slice(0, commaIdx);
                  }
                  const words = ride.pickup.trim().split(/\s+/);
                  return words.slice(0, 2).join(" ");
                })()}
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-yellow-700">
            {ride?.distance
              ? `${Number(ride.distance).toFixed(2)} KM away`
              : "Ride"}
          </div>
        </div>
        {/* Divider */}
        {/* Ride Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <i className="ri-map-pin-2-fill  text-xl"></i>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {(() => {
                  if (!ride?.destination) return "-";
                  const commaIdx = ride.destination.indexOf(",");
                  if (commaIdx !== -1) {
                    return ride.destination.slice(0, commaIdx);
                  }
                  const words = ride.destination.trim().split(/\s+/);
                  return words.slice(0, 2).join(" ");
                })()}
              </h3>
              <p className="text-sm text-gray-500">{ride?.destination}</p>
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
                <button
                  onClick={() => setFinishRidePanel(true)}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold p-2 rounded-lg text-lg shadow transition"
                >
                  Complete Ride
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} ride={ride} />
      </div>
    </div>
  );
};
export default CaptainRiding;
