import React, { useState } from "react";

const MAX_ADDRESS_LENGTH = 30;

const ConfirmRide = (props) => {
  const [showFullPick, setShowFullPick] = useState(false);
  const [showFullDest, setShowFullDest] = useState(false);

  const pickIsLong = props.pick && props.pick.length > MAX_ADDRESS_LENGTH;
  const destIsLong = props.dest && props.dest.length > MAX_ADDRESS_LENGTH;

  const fareValue =
    props.fare && props.vehicleType ? props.fare[props.vehicleType] : "-";

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmedRide(false);
        }}
      >
        <i className="text-3xl text-gray-5  00 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        {props.vehicleImg ? (
          <img className="h-20" src={props.vehicleImg} alt="" />
        ) : null}
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {" "}
                {(() => {
                  if (!props.pick) return "-";
                  const commaIdx = props.pick.indexOf(",");
                  if (commaIdx !== -1) {
                    return props.pick.slice(0, commaIdx);
                  }
                  const words = props.pick.trim().split(/\s+/);
                  return words.slice(0, 2).join(" ");
                })()}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {pickIsLong && !showFullPick ? (
                  <>
                    {props.pick.slice(0, MAX_ADDRESS_LENGTH) + "... "}
                    <button
                      className="text-blue-600 underline text-xs"
                      onClick={() => setShowFullPick(true)}
                    >
                      See more
                    </button>
                  </>
                ) : pickIsLong && showFullPick ? (
                  <>
                    {props.pick + " "}
                    <button
                      className="text-blue-600 underline text-xs"
                      onClick={() => setShowFullPick(false)}
                    >
                      See less
                    </button>
                  </>
                ) : (
                  props.pick || "-"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {(() => {
                  if (!props.dest) return "-";
                  const commaIdx = props.dest.indexOf(",");
                  if (commaIdx !== -1) {
                    return props.dest.slice(0, commaIdx);
                  }
                  const words = props.dest.trim().split(/\s+/);
                  return words.slice(0, 2).join(" ");
                })()}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {destIsLong && !showFullDest ? (
                  <>
                    {props.dest.slice(0, MAX_ADDRESS_LENGTH) + "... "}
                    <button
                      className="text-blue-600 underline text-xs"
                      onClick={() => setShowFullDest(true)}
                    >
                      See more
                    </button>
                  </>
                ) : destIsLong && showFullDest ? (
                  <>
                    {props.dest + " "}
                    <button
                      className="text-blue-600 underline text-xs"
                      onClick={() => setShowFullDest(false)}
                    >
                      See less
                    </button>
                  </>
                ) : (
                  props.dest || "-"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{fareValue}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmedRide(false);
            props.createRide();
          }}
          className="w-full mt-5 bg-gray-900 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
