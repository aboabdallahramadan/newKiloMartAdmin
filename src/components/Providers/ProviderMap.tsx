"use client"
import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import { ProviderProfile } from '@/types/providerProfile';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const ProviderMap = () => {
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch latitude and longitude from the API
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/backend/api/provider-profile/filter?providerId=${id}&isActive=true&pageNumber=1&pageSize=10`);
        const data = await response.json();
        if (data.status) {
          setProfile(data.data.items[0]);
        } else {
          console.error("Failed to fetch location:", data.message);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(false);
    fetchLocation();
  }, []);

  return (
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider Location</h2>
        {loading ? (
          <ElementLoader />
        ) : ( 
        <>
        {
          profile ? (<MapContainer center={[profile.latitude, profile.longitude]} zoom={13} style={{ height: "400px", width: "100%" }} className='z-0'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[profile.latitude, profile.longitude]}>
              <Popup>
                <div>
                  <p>Type: {profile.buildingType}</p>
                  <p>Name: {profile.locationName}</p>
                  <p>Building Number: {profile.buildingNumber}</p>
                  <p>Apartment Number: {profile.apartmentNumber}</p>
                  <p>Floor Number: {profile.floorNumber}</p>
                  <p>Street Name: {profile.streetNumber}</p>
                  <p>Phone Number: {profile.phoneNumber}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>) :(
            <div className="text-center">
              <p>No location found for this provider.</p>
            </div>
          )
        }
        
          
        </>
        )}
      </div>
    
  );
};

export default ProviderMap;