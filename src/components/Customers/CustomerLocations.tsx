"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Location } from '@/types/customerDetails';
import Link from 'next/link';

const CustomerLocations = () => {
  const { id } = useParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading , setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/backend/api/admin-panel/customer-by-id?customerId=${id}`);
        const result = await response.json();
        setLocations(result.data.locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return (
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Customer Location</h2>
        {isLoading ? (
          <ElementLoader />
        ) : (
          <MapContainer center={{ lat: 24.181212251491353, lng: 43.91654599169042 }} zoom={6} style={{ height: "400px", width: "100%" }} className='z-0'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
            <Marker key={location.locationId} position={{ lat: location.locationLatitude, lng: location.locationLongitude }}>
                <Popup>
                    <div>
                    <p>Name: {location.locationName}</p>
                    <p>Type: {location.locationDetailsBuildingType}</p>
                    <p>Building Number: {location.locationDetailsBuildingNumber}</p>
                    <p>Apartment Number: {location.locationDetailsApartmentNumber}</p>
                    <p>Floor Number: {location.locationDetailsFloorNumber}</p>
                    <p>Street Name: {location.locationDetailsStreetNumber}</p>
                    <p>Phone Number: {location.locationDetailsPhoneNumber}</p>
                    </div>
                </Popup>
            </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    
  );
};

export default CustomerLocations;