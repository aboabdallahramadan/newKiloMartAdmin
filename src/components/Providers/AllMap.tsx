"use client"
import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Location } from '@/types/location';
import Link from 'next/link';

const AllMap = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
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
    },
    {
        id: 2,
        userId: 2,
        userName: "John Doe",
        type: "Apartment",
        buildingNumber: "123",
        apartmentNumber: "456",
        floorNumber: "7",
        streetName: "Al-Riyadh",
        phoneNumber: "+966512345678",
        mapDetails: {
          latitude: 24.872622193731775,
          longitude: 41.19193667057781
        }
      },
      {
        id: 3,
        userId: 3,
        userName: "John Doe",
        type: "Apartment",
        buildingNumber: "123",
        apartmentNumber: "456",
        floorNumber: "7",
        streetName: "Al-Riyadh",
        phoneNumber: "+966512345678",
        mapDetails: {
          latitude: 24.233079626757707,
          longitude: 46.61918265698761,
        }
      },
      {
        id: 4,
        userId: 4,
        userName: "John Doe",
        type: "Apartment",
        buildingNumber: "123",
        apartmentNumber: "456",
        floorNumber: "7",
        streetName: "Al-Riyadh",
        phoneNumber: "+966512345678",
        mapDetails: {
          latitude: 25.230921977262206,
          longitude: 47.45414357797373,
        }
      },
      {
        id: 5,
        userId: 5,
        userName: "John Doe",
        type: "Apartment",
        buildingNumber: "123",
        apartmentNumber: "456",
        floorNumber: "7",
        streetName: "Al-Riyadh",
        phoneNumber: "+966512345678",
        mapDetails: {
          latitude: 24.55718835750745,
          longitude: 46.618417808853586,
        }
      }
  ]);
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
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Providers Location</h2>
        {loading ? (
          <ElementLoader />
        ) : (
          <MapContainer center={{ lat: 24.181212251491353, lng: 43.91654599169042 }} zoom={6} style={{ height: "400px", width: "100%" }} className='z-0'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
            <Marker key={location.id} position={{ lat: location.mapDetails.latitude, lng: location.mapDetails.longitude }}>
                <Popup>
                    <div>
                    <p>User Name: <Link className='text-primary hover:text-primary/50' href={`/providers/${location.userId}`}>{location.userName}</Link></p>
                    <p>Type: {location.type}</p>
                    <p>Building Number: {location.buildingNumber}</p>
                    <p>Apartment Number: {location.apartmentNumber}</p>
                    <p>Floor Number: {location.floorNumber}</p>
                    <p>Street Name: {location.streetName}</p>
                    <p>Phone Number: {location.phoneNumber}</p>
                    </div>
                </Popup>
            </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    
  );
};

export default AllMap;