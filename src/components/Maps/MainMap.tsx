"use client"
import { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ElementLoader from '../common/ElementLoader';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


const AllMap = () => {
  type city = {
    id:number,
    city:string,
    orders:number,
    mapDetails: {
      latitude:number,
      longitude: number
    }
  }
  const [locations, setLocations] = useState<city[]>([
    {
      id: 1,
      city: "Riyadh",
      orders: 150,
      mapDetails: {
        latitude: 24.7136,
        longitude: 46.6753
      }
    },
    {
      id: 2,
      city: "Jeddah",
      orders: 120,
      mapDetails: {
        latitude: 21.5433,
        longitude: 39.1728
      }
    },
    {
      id: 3,
      city: "Mecca",
      orders: 90,
      mapDetails: {
        latitude: 21.4225,
        longitude: 39.8262
      }
    },
    {
      id: 4,
      city: "Medina",
      orders: 80,
      mapDetails: {
        latitude: 24.5247,
        longitude: 39.5692
      }
    },
    {
      id: 5,
      city: "Dammam",
      orders: 70,
      mapDetails: {
        latitude: 26.4207,
        longitude: 50.0888
      }
    },
    {
      id: 6,
      city: "Taif",
      orders: 60,
      mapDetails: {
        latitude: 21.2703,
        longitude: 40.4158
      }
    },
    {
      id: 7,
      city: "Tabuk",
      orders: 45,
      mapDetails: {
        latitude: 28.3835,
        longitude: 36.5662
      }
    },
    {
      id: 8,
      city: "Abha",
      orders: 40,
      mapDetails: {
        latitude: 18.2164,
        longitude: 42.5053
      }
    },
    {
      id: 9,
      city: "Khobar",
      orders: 55,
      mapDetails: {
        latitude: 26.2172,
        longitude: 50.1971
      }
    },
    {
      id: 10,
      city: "Qassim",
      orders: 35,
      mapDetails: {
        latitude: 26.3268,
        longitude: 43.9719
      }
    }
  ]);  const [loading, setLoading] = useState(true);

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
      <div className="w-full rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Orders Location</h2>
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
                      <h3>{location.city}</h3>
                      <p>Total Orders: </p>{location.orders}
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