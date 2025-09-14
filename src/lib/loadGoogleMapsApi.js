// src/lib/loadGoogleMapsApi.js
let loadPromise = null;

export function loadGoogleMapsApi() {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // Already loaded?
    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    const apiKey = process.env.REACT_APP_GMAPS_API_KEY;
    if (!apiKey) {
      reject(new Error("Missing REACT_APP_GMAPS_API_KEY in .env"));
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.onerror = () => reject(new Error("Failed to load Google Maps JS API"));
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error("Google Maps JS API loaded but 'google.maps' missing"));
      }
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}