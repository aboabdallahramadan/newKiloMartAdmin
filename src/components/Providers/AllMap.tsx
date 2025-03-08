"use client";
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import ElementLoader from '../common/ElementLoader';
import Link from 'next/link';
import { ProvidersLocations } from '@/types/providersLocations';

const mapContainerStyle = { height: "400px", width: "100%" };
const defaultCenter = { lat: 24.181212251491353, lng: 43.91654599169042 };

const AllMap: React.FC = () => {
  const [locations, setLocations] = useState<ProvidersLocations[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProvidersLocations | null>(null);

  useEffect(() => {
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
    fetchLocation();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded || loading) return <ElementLoader size={10} />;

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Providers Location</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={6}
      >
        {locations.map((location) => (
          <Marker
            key={location.providerId}
            position={{
              lat: location.locationDetails.lat,
              lng: location.locationDetails.long,
            }}
            onClick={() => setSelectedProvider(location)}
          />
        ))}
        {selectedProvider && (
          <InfoWindow
            position={{
              lat: selectedProvider.locationDetails.lat,
              lng: selectedProvider.locationDetails.long,
            }}
            onCloseClick={() => setSelectedProvider(null)}
          >
            <div>
              <p>
                User Name:{" "}
                <Link className="text-primary hover:text-primary/50" href={`/providers/${selectedProvider.providerId}`}>
                  {selectedProvider.displayName}
                </Link>
              </p>
              <p>Name: {selectedProvider.displayName}</p>
              <p>Building Number: {selectedProvider.locationDetails.buildingNumber}</p>
              <p>Apartment Number: {selectedProvider.locationDetails.apartmentNumber}</p>
              <p>Floor Number: {selectedProvider.locationDetails.floorNumber}</p>
              <p>Street Name: {selectedProvider.locationDetails.streetNumber}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default AllMap;
