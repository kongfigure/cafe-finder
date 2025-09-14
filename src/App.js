// src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CafeList from "./components/CafeList";
import { loadGoogleMapsApi } from "./lib/loadGoogleMapsApi";

function App() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Click handler from the Hero button
  const handleFindCafes = async () => {
    setError("");
    setLoading(true);

    try {
      // 1) Ensure Maps JS (with Places) is loaded
      const google = await loadGoogleMapsApi();

      // 2) Get user's location
      const position = await getCurrentPosition();
      const { latitude: lat, longitude: lng } = position.coords;

      // 3) Build PlacesService. No map needed — pass a dummy div.
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: new google.maps.LatLng(lat, lng),
        radius: 1500, // meters
        type: "cafe",
      };

      // 4) Run nearbySearch wrapped in a Promise
      const results = await placesNearbySearch(service, request);

      // 5) Normalize results for UI
      const normalized = results.map((place) => ({
        place_id: place.place_id,
        name: place.name,
        rating: place.rating,
        vicinity: place.vicinity,
        photoUrl:
          place.photos && place.photos.length > 0
            ? place.photos[0].getUrl({ maxWidth: 400 })
            : null,
      }));

      setCafes(normalized);
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to fetch cafes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Hero onFind={handleFindCafes} />

      <main>
        {loading && (
          <div className="container my-4">
            <div className="alert alert-info text-center mb-0">Searching nearby cafes…</div>
          </div>
        )}
        {error && (
          <div className="container my-4">
            <div className="alert alert-danger text-center mb-0">{error}</div>
          </div>
        )}

        <CafeList cafes={cafes} />
      </main>
    </>
  );
}

export default App;

/* ---------- helpers ---------- */

// Promisified geolocation
function getCurrentPosition(options) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported by this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, () => {
      reject(new Error("Location access denied or unavailable."));
    }, options);
  });
}

// Promisified Places nearbySearch
function placesNearbySearch(service, request) {
  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results || []);
      } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Places nearbySearch failed: ${status}`));
      }
    });
  });
}