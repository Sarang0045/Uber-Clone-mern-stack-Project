import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LiveTracking = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  // Initialize map and marker once
  useEffect(() => {
    // 1️⃣ Create the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", // free OSM style
      center: [currentPosition.lng, currentPosition.lat],
      zoom: 15,
    });

    // 2️⃣ Add zoom/rotate controls
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // 3️⃣ Create a marker but don't add it yet
    marker.current = new maplibregl.Marker()
      .setLngLat([currentPosition.lng, currentPosition.lat])
      .addTo(map.current);

    return () => {
      // Clean up on unmount
      if (map.current) map.current.remove();
    };
  }, []);

  // Watch the user's position and update marker + map center
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    // Update both state and marker on position change
    const onPositionUpdate = ({ coords }) => {
      const { latitude, longitude } = coords;
      setCurrentPosition({ lat: latitude, lng: longitude });

      // Move the marker
      if (marker.current) {
        marker.current.setLngLat([longitude, latitude]);
      }

      // Pan map to the new location
      if (map.current) {
        map.current.easeTo({ center: [longitude, latitude] });
      }
    };

    // Initial getCurrentPosition
    navigator.geolocation.getCurrentPosition(
      onPositionUpdate,
      (err) => {
        console.error("Geolocation error:", err);
        // Optionally show a message to the user here
      },
      { enableHighAccuracy: true }
    );

    // Then watchPosition for live updates
    const watchId = navigator.geolocation.watchPosition(
      onPositionUpdate,
      console.error,
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default LiveTracking;
