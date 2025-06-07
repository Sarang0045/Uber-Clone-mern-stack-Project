import React from "react";

const LookingForDriver = (props) => {
  const fareValue =
    props.fare && props.vehicleType ? props.fare[props.vehicleType] : "-";
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-20" src={props.vehicleImg} alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
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
              <p className="text-sm -mt-1 text-gray-600">{props.pick || "-"}</p>
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
              <p className="text-sm -mt-1 text-gray-600">{props.dest || "-"}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{fareValue} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
