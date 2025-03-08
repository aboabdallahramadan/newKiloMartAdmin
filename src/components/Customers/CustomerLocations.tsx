"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ElementLoader from '../common/ElementLoader';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { Location } from '@/types/customerDetails';

const mapContainerStyle = { height: "400px", width: "100%" };
const defaultCenter = { lat: 24.181212251491353, lng: 43.91654599169042 };

const CustomerLocations = () => {
  const { id } = useParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

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
  }, [id]);

  // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key or load it from an environment variable.
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded || isLoading) return <ElementLoader />;

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Customer Location</h2>
      <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={
            locations.length > 0
              ? { lat: locations[0].locationLatitude, lng: locations[0].locationLongitude }
              : defaultCenter
          }
          zoom={6}
      >
        {locations.map((location) => (
          <Marker
            key={location.locationId}
            position={{ lat: location.locationLatitude, lng: location.locationLongitude }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.locationLatitude, lng: selectedLocation.locationLongitude }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <p>Name: {selectedLocation.locationName}</p>
              <p>Type: {selectedLocation.locationDetailsBuildingType}</p>
              <p>Building Number: {selectedLocation.locationDetailsBuildingNumber}</p>
              <p>Apartment Number: {selectedLocation.locationDetailsApartmentNumber}</p>
              <p>Floor Number: {selectedLocation.locationDetailsFloorNumber}</p>
              <p>Street Name: {selectedLocation.locationDetailsStreetNumber}</p>
              <p>Phone Number: {selectedLocation.locationDetailsPhoneNumber}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default CustomerLocations;
