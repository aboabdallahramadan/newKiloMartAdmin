"use client"
import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Location } from '@/types/location';

const ProviderMap = () => {
  const [location, setLocation] = useState<Omit<Location, 'userId' | 'userName' >>({
    id: 0,
    type: "Apartment",
    buildingNumber: "123",
    apartmentNumber: "456",
    floorNumber: "7",
    streetName: "Al-Riyadh",
    phoneNumber: "+966512345678",
    mapDetails: {
        latitude: 24.743752042257807,
        longitude: 46.65313878798754,
    }
  });
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
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider Location</h2>
        {loading ? (
          <ElementLoader />
        ) : (
          <MapContainer center={[location.mapDetails.latitude, location.mapDetails.longitude]} zoom={13} style={{ height: "400px", width: "100%" }} className='z-0'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.mapDetails.latitude, location.mapDetails.longitude]}>
              <Popup>
                <div>
                  <p>Type: {location.type}</p>
                  <p>Building Number: {location.buildingNumber}</p>
                  <p>Apartment Number: {location.apartmentNumber}</p>
                  <p>Floor Number: {location.floorNumber}</p>
                  <p>Street Name: {location.streetName}</p>
                  <p>Phone Number: {location.phoneNumber}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    
  );
};

export default ProviderMap;