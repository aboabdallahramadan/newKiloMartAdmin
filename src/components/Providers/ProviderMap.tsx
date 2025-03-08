"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ElementLoader from '../common/ElementLoader';
import { ProviderProfile } from '@/types/providerProfile';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = { height: "400px", width: "100%" };

const ProviderMap = () => {
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
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
    fetchLocation();
  }, [id]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded || loading) return <ElementLoader />;

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider Location</h2>
      {profile ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: profile.latitude, lng: profile.longitude }}
          zoom={13}
        >
          <Marker
            position={{ lat: profile.latitude, lng: profile.longitude }}
            onClick={() => setShowInfoWindow(true)}
          />
          {showInfoWindow && (
            <InfoWindow
              position={{ lat: profile.latitude, lng: profile.longitude }}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div>
                <p>Type: {profile.buildingType}</p>
                <p>Name: {profile.locationName}</p>
                <p>Building Number: {profile.buildingNumber}</p>
                <p>Apartment Number: {profile.apartmentNumber}</p>
                <p>Floor Number: {profile.floorNumber}</p>
                <p>Street Name: {profile.streetNumber}</p>
                <p>Phone Number: {profile.phoneNumber}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <div className="text-center">
          <p>No location found for this provider.</p>
        </div>
      )}
    </div>
  );
};

export default ProviderMap;
