import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclespanel(false);
        }}
        className="p-1 text-center w-[90%] absolute top-0 "
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmedRide(true);
          props.setVehiclespanel(false);
        }}
        className="flex border-2 border-gray-500 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between "
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium test-base">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium test-sm">2 min away</h5>
          <p className="font-normal test-xs text-gray-600">
            Affordable, Compact
          </p>
        </div>
        <h2 className="text-lg font-semibold">$192.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmedRide(true);
          props.setVehiclespanel(false);
        }}
        className="flex border-2 border-gray-500 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between "
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium test-base">
            Moto{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium test-sm">2 min away</h5>
          <p className="font-normal test-xs text-gray-600">
            Affordable, Compact
          </p>
        </div>
        <h2 className="text-xl font-semibold">$65.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmedRide(true);
          props.setVehiclespanel(false);
        }}
        className="flex border-2 border-gray-500 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between "
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium test-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium test-sm">2 min away</h5>
          <p className="font-normal test-xs text-gray-600">
            Affordable, Compact
          </p>
        </div>
        <h2 className="text-lg font-semibold">$118.20</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
