import { useState } from 'react';
import Link from 'next/link';
import { Order } from '@/types/order';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

interface OrderMapProps {
  order: Order;
}

const mapContainerStyle = { height: "400px", width: "100%" };

const OrderMap = ({ order }: OrderMapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  });

  const [selectedMarker, setSelectedMarker] = useState<"customer" | "provider" | "delivery" | null>(null);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  const customerPosition = {
    lat: order.orderDetails.customerLocationLatitude, 
    lng: order.orderDetails.customerLocationLongitude
  };

  const providerPosition = {
    lat: order.orderDetails.providerLocationLatitude, 
    lng: order.orderDetails.providerLocationLongitude
  };

  const driverPosition = order.driverLocation ? {
    lat: order.driverLocation.latitude,
    lng: order.driverLocation.longitude
  } : null;

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Order Locations</h2>
      <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={customerPosition}
          zoom={6}
      >
        <Marker
          position={customerPosition}
          onClick={() => setSelectedMarker("customer")}
        />
        {selectedMarker === "customer" && (
          <InfoWindow
            position={customerPosition}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p>
                Customer:{" "}
                <Link className="text-primary hover:text-primary/50" href={`/customers/${order.orderDetails.customer}`}>
                  {order.orderDetails.customerDisplayName}
                </Link>
              </p>
            </div>
          </InfoWindow>
        )}

        <Marker
          position={providerPosition}
          onClick={() => setSelectedMarker("provider")}
        />
        {selectedMarker === "provider" && (
          <InfoWindow
            position={providerPosition}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p>
                Provider:{" "}
                <Link className="text-primary hover:text-primary/50" href={`/providers/${order.orderDetails.provider}`}>
                  {order.orderDetails.providerDisplayName}
                </Link>
              </p>
            </div>
          </InfoWindow>
        )}

        {driverPosition && (
          <>
            <Marker
              position={driverPosition}
              onClick={() => setSelectedMarker("delivery")}
            />
            {selectedMarker === "delivery" && (
              <InfoWindow
                position={driverPosition}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <p>
                    Delivery:{" "}
                    <Link className="text-primary hover:text-primary/50" href={`/deliveries/${order.orderDetails.delivery}`}>
                      {order.orderDetails.deliveryDisplayName}
                    </Link>
                  </p>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default OrderMap;
