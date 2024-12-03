"use client"
import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const DeliveryMap = () => {
  const [location, setLocation] = useState({ lat: 24.743752042257807, lng: 46.65313878798754 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latitude and longitude from the API
    // const fetchLocation = async () => {
    //   try {
    //     const response = await fetch('YOUR_API_ENDPOINT');
    //     const data = await response.json();
    //     if (data.status) {
    //       setLocation({ lat: data.latitude, lng: data.longitude });
    //     } else {
    //       console.error("Failed to fetch location:", data.message);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching location:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    setLoading(false);
    // fetchLocation();
  }, []);

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Delivery Location</h2>
      {loading ? (
        <ElementLoader />
      ) : (
        <MapContainer center={location} zoom={13} style={{ height: "400px", width: "100%" }} className='z-0'>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>
              Delivery Location
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default DeliveryMap;