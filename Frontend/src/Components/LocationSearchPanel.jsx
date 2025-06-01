import React from "react";

const LocationSearchPanel = (props) => {
  const Locations = [
    "24B, Near Satyam Hospital, Sector 12, Dwarka, New Delhi, Delhi 110078",
    "22B, Near Satyam Hospital, Sector 12, Dwarka, New Delhi, Delhi 110078",
    "21B, Near Satyam Hospital, Sector 12, Dwarka, New Delhi, Delhi 110078",
  ];

  return (
    <div>
      {Locations.map((e, idx) => (
        <div
          key={idx}
          className="flex items-center border-2 p-3 rounded-xl border-gray-100 active:border-black justify-start gap-4 my-2"
          onClick={() => {
            props.setVehiclespanel(true);
            props.setPanel(false);
          }}
        >
          <h2 className="bg-[#eee] h-10 w-16 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-fill text-2xl"></i>
          </h2>
          <h4 className="font-medium">{e}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
