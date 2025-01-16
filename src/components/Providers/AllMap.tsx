"use client"
import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { ProvidersLocations } from '@/types/providersLocations';
import Link from 'next/link';

const AllMap = () => {
  const [locations, setLocations] = useState<ProvidersLocations[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch latitude and longitude from the API
    const fetchLocation = async () => {
      setLoading(true);
      try {
        const response = await fetch('/backend/api/admin-panel/providers/paginated?page=1&pageSize=99999999');
        const data = await response.json();
        if (data.status) {
          setLocations(data.data.providers);
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
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Providers Location</h2>
        {loading ? (
          <ElementLoader size={10} />
        ) :( locations.length > 0 ? (
          <MapContainer center={{ lat: 24.181212251491353, lng: 43.91654599169042 }} zoom={6} style={{ height: "400px", width: "100%" }} className='z-0'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
            <Marker key={location.providerId} position={{ lat: location.locationDetails.lat, lng: location.locationDetails.long }}>
                <Popup>
                    <div>
                    <p>User Name: <Link className='text-primary hover:text-primary/50' href={`/providers/${location.providerId}`}>{location.displayName}</Link></p>
                    <p>Name: {location.displayName}</p>
                    <p>Building Number: {location.locationDetails.buildingNumber}</p>
                    <p>Apartment Number: {location.locationDetails.apartmentNumber}</p>
                    <p>Floor Number: {location.locationDetails.floorNumber}</p>
                    <p>Street Name: {location.locationDetails.streetNumber}</p>
                    </div>
                </Popup>
            </Marker>
            ))}
          </MapContainer>
        ) : (
          <p>No locations available.</p>
        ))}
      </div>
    
  );
};

export default AllMap;