import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  // Initialize map and marker once
  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`,
      center: [defaultCenter.lng, defaultCenter.lat],
      zoom: 15,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    marker.current = new maplibregl.Marker()
      .setLngLat([defaultCenter.lng, defaultCenter.lat])
      .addTo(map.current);

    return () => {
      if (map.current) map.current.remove();
    };
  }, []);

  // Live update position every second (like Google Maps example)
  useEffect(() => {
    let intervalId;

    const updatePosition = () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          if (marker.current) marker.current.setLngLat([longitude, latitude]);
          if (map.current) map.current.easeTo({ center: [longitude, latitude] });
        },
        (err) => {
          // Optionally handle error
        },
        { enableHighAccuracy: true }
      );
    };

    updatePosition(); // Initial position update
    intervalId = setInterval(updatePosition, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh", ...containerStyle }}
    />
  );
};

export default LiveTracking;
