import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ComfirmedRide from "../Components/ConfirmedRide";
import LookingForDriver from "../Components/LookingForDrivers";
import WaitingForDriver from "../Components/WaitingForDriver";

const Home = () => {
  const [pick, setPick] = useState("");
  const [dest, setDest] = useState("");
  const [panel, setPanel] = useState(false);
  const vehiclepanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmedRideRef = useRef(null);
  const [Vehiclespanel, setVehiclespanel] = useState(false);
  const [confirmedRide, setConfirmedRide] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useLayoutEffect(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panel]);

  useLayoutEffect(() => {
    if (Vehiclespanel) {
      gsap.to(vehiclepanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclepanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [Vehiclespanel]);

  useLayoutEffect(() => {
    if (confirmedRide) {
      gsap.to(confirmedRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmedRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmedRide]);

  useLayoutEffect(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useLayoutEffect(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt="uber"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map with cars"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            onClick={() => {
              setPanel(false);
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 top-3 right-6 text-3xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-bold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a PickUp Location"
              onClick={() => setPanel(true)}
              value={pick}
              onChange={(e) => setPick(e.target.value)}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter Your Destination"
              onClick={() => setPanel(true)}
              value={dest}
              onChange={(e) => setDest(e.target.value)}
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanel={setPanel}
            panel={panel}
            Vehiclespanel={Vehiclespanel}
            setVehiclespanel={setVehiclespanel}
          />
        </div>
      </div>
      <div
        ref={vehiclepanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12 "
      >
        <VehiclePanel
          setConfirmedRide={setConfirmedRide}
          setVehiclespanel={setVehiclespanel}
        />
      </div>
      <div
        ref={confirmedRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12 "
      >
        <ComfirmedRide
          setConfirmedRide={setConfirmedRide}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver waitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
