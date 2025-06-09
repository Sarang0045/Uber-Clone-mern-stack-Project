import { useRef, useState, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ComfirmedRide from "../Components/ConfirmedRide";
import LookingForDriver from "../Components/LookingForDrivers";
import WaitingForDriver from "../Components/WaitingForDriver";
import axios from "axios";
import React, { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../Components/liveTracking";

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
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [fare, setFare] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleImg, setVehicleImg] = useState("");
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { sendMessage, socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    console.log(user);
    sendMessage("join", { role: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (data) => {
    setRide(data);
    setVehicleFound(false);
    setWaitingForDriver(true);
  });

  socket.on("ride-started", (ride) => {
    console.log("Ride started:", ride);
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride, vehicleImg } });
  });

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
        transform: "translateY(150%)",
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
        transform: "translateY(150%)",
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

  const fetchSuggestions = async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "pickup") {
      setPick(value);
      setActiveField("pickup");
    } else {
      setDest(value);
      setActiveField("destination");
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timer = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    setTypingTimeout(timer);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  async function FindTrip() {
    if (pick && dest) {
      setPanel(false);
      setVehiclespanel(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          {
            params: {
              pickup: pick,
              destination: dest,
              vehicleType: "auto",
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setFare(response.data.fare);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please enter both pickup and destination locations.");
    }
  }

  async function createRide(vehicleType) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pick,
          destination: dest,
          vehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("Ride created successfully:", response.data);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 z-10">
      {/* Uber logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt="uber"
      />
      {/* Map background */}
      <div className="absolute inset-0 z-0">
        <LiveTracking />
      </div>
      {/* Main content overlays */}
      <div className="flex flex-col justify-end h-full absolute top-0 left-0 w-full z-10 pointer-events-none">
        {/* Trip search panel */}
        <div className="h-[30vh] min-h-[200px] bg-white p-5 relative pointer-events-auto">
          <h5
            onClick={() => {
              setPanel(false);
              setSuggestions([]);
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 top-3 right-6 text-3xl cursor-pointer"
          >
            <i className="ri-close-line"></i>
          </h5>
          <h4 className="text-2xl font-bold mb-2 text-center">Find a Trip</h4>
          <form>
            <div className="relative mt-3">
              <i className="ri-map-pin-fill text-2xl absolute left-3 top-1 text-gray-500"></i>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                placeholder="Add a PickUp Location"
                onClick={() => {
                  setPanel(true);
                  setActiveField("pickup");
                  fetchSuggestions(pick);
                }}
                value={pick}
                onChange={(e) => handleInputChange("pickup", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="relative mt-3">
              <i className="ri-flag-fill text-2xl absolute left-3 top-1 text-gray-500"></i>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                placeholder="Enter Your Destination"
                onClick={() => {
                  setPanel(true);
                  setActiveField("destination");
                  fetchSuggestions(dest);
                }}
                value={dest}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                autoComplete="off"
              />
            </div>
            <button
              className="border text-white font-semibold bg-gray-900 text-lg px-12 py-2 rounded-lg mt-5 w-full"
              type="button"
              onClick={() => {
                FindTrip();
              }}
            >
              Find Trip
            </button>
          </form>
        </div>
        {/* Location search suggestions panel */}
        <div
          ref={panelRef}
          className="h-0 bg-white rounded-t-3xl pointer-events-auto"
        >
          <LocationSearchPanel
            setPanel={setPanel}
            panel={panel}
            Vehiclespanel={Vehiclespanel}
            setVehiclespanel={setVehiclespanel}
            suggestions={suggestions}
            isLoading={isLoading}
            onSuggestionClick={(suggestion) => {
              if (activeField === "pickup") {
                setPick(suggestion.display_name);
              } else if (activeField === "destination") {
                setDest(suggestion.display_name);
              }
              setSuggestions([]);
              setPanel(false);
            }}
          />
        </div>
      </div>
      {/* Vehicle selection, confirmation, and waiting overlays */}
      <div
        ref={vehiclepanelRef}
        className="fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-12 rounded-t-3xl shadow-lg pointer-events-auto"
      >
        <VehiclePanel
          setConfirmedRide={setConfirmedRide}
          setVehiclespanel={setVehiclespanel}
          Fare={fare}
          pickup={pick}
          destination={dest}
          vehicleType={setVehicleType}
          setVehicleImg={setVehicleImg}
        />
      </div>
      <div
        ref={confirmedRideRef}
        className="fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-12 rounded-t-3xl shadow-lg pointer-events-auto"
      >
        <ComfirmedRide
          fare={fare}
          pick={pick}
          dest={dest}
          vehicleType={vehicleType}
          vehicleImg={vehicleImg}
          setConfirmedRide={setConfirmedRide}
          setVehicleFound={setVehicleFound}
          createRide={() => createRide(vehicleType)}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-t-3xl shadow-lg pointer-events-auto"
      >
        <LookingForDriver
          fare={fare}
          pick={pick}
          dest={dest}
          vehicleType={vehicleType}
          vehicleImg={vehicleImg}
          createRide={() => createRide(vehicleType)}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-20 bottom-0 bg-white px-3 py-6 pt-12 rounded-t-3xl shadow-lg pointer-events-auto"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
