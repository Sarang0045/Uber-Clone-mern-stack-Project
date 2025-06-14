import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext) || {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={
              captain?.profileImage ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt=""
          />
          <h4 className="text-lg font-medium">
            {captain?.fullname?.firstname} {captain?.fullname?.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">
            ₹{captain?.earnings !== undefined ? captain.earnings : "0.00"}
          </h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">
            {captain?.hoursOnline !== undefined ? captain.hoursOnline : "0.0"}
          </h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">
            {captain?.completedRides !== undefined ? captain.completedRides : "0"}
          </h5>
          <p className="text-sm text-gray-600">Completed Rides</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">
            {captain?.vehicle?.plate || "-"}
          </h5>
          <p className="text-sm text-gray-600">Vehicle Plate</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
