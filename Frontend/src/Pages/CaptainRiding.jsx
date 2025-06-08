import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    <div className="min-h-screen relative overflow-y-auto">
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover rounded-xl"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10">
        <div className="p-6 bg-white rounded-t-3xl shadow-xl flex flex-col items-center">
          {/* Ride/User Info Card */}
          <div className="w-full flex flex-col items-center mb-4">
            <div className="flex items-center gap-4 mb-2">
              <img
                className="h-14 w-14 rounded-full object-cover border-2 border-yellow-400"
                src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                alt="user"
              />
              <div>
                <div className="text-xl font-bold">
                  {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
                </div>
                <div className="text-gray-700 text-base">
                  {ride?.pickup}
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
          <div className="w-full border-b border-gray-200 mb-4"></div>
          {/* Ride Details */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <i className="ri-map-pin-user-fill text-xl text-gray-700"></i>
              <div>
                <div className="text-base font-medium">
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
                <div className="text-xs text-gray-500">{ride?.pickup}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <i className="ri-map-pin-2-fill text-xl text-gray-700"></i>
              <div>
                <div className="text-base font-medium">
                  {(() => {
                    if (!ride?.destination) return "-";
                    const commaIdx = ride.destination.indexOf(",");
                    if (commaIdx !== -1) {
                      return ride.destination.slice(0, commaIdx);
                    }
                    const words = ride.destination.trim().split(/\s+/);
                    return words.slice(0, 2).join(" ");
                  })()}
                </div>
                <div className="text-xs text-gray-500">{ride?.destination}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <i className="ri-currency-line text-xl text-gray-700"></i>
              <div>
                <div className="text-base font-medium">₹{ride?.fare}</div>
                <div className="text-xs text-gray-500">Cash</div>
              </div>
            </div>
          </div>
          {/* Complete Ride Button */}
          <div className="w-full flex justify-center mt-6">
            <button
              className="bg-green-600 text-white font-bold px-10 py-3 rounded-lg text-lg shadow-lg w-2/3"
              onClick={() => setFinishRidePanel(true)}
            >
              Complete Ride
            </button>
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
