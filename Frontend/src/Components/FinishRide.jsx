import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FinishRide = (props) => {
  const user = props.ride?.user?.fullname;
  const address = props.ride?.pickup;
  const distance = props.ride?.distance
    ? `${Number(props.ride.distance).toFixed(2)} KM away`
    : "Ride";

  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      {/* Distance and user/address */}
      <div className="flex flex-col items-center justify-center bg-yellow-400 rounded-t-xl py-6 mb-4">
        <div className="text-3xl font-bold mb-2">{distance}</div>
        <div className="text-lg font-semibold">
          {user?.firstname} <span className="lowercase">{user?.lastname}</span>
        </div>
        <div className="text-base text-gray-700">{address}</div>
      </div>
      {/* Divider */}
      <div className="border-b border-gray-300 mb-4"></div>
      {/* Fare and destination */}
      <div className="flex flex-col gap-4 px-2">
        <div className="flex items-center gap-3">
          <i className="ri-map-pin-user-fill text-xl"></i>
          <div>
            <h3 className="text-lg font-medium">
              {(() => {
                if (!props.ride?.pickup) return "-";
                const commaIdx = props.ride?.pickup.indexOf(",");
                if (commaIdx !== -1) {
                  return props.ride?.pickup.slice(0, commaIdx);
                }
                const words = props.ride?.pickup.trim().split(/\s+/);
                return words.slice(0, 2).join(" ");
              })()}
            </h3>
            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <i className="ri-map-pin-2-fill text-xl"></i>
          <div>
            <h3 className="text-lg font-medium">
              {(() => {
                if (!props.ride?.destination) return "-";
                const commaIdx = props.ride?.destination.indexOf(",");
                if (commaIdx !== -1) {
                  return props.ride?.destination.slice(0, commaIdx);
                }
                const words = props.ride?.destination.trim().split(/\s+/);
                return words.slice(0, 2).join(" ");
              })()}
            </h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <i className="ri-currency-line text-xl"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <button
        onClick={endRide}
        className="w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
      >
        Finish Ride
      </button>
    </div>
  );
};

export default FinishRide;
