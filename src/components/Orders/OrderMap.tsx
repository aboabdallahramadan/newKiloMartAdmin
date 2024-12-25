import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from 'next/link';
import { Order } from '@/types/order';




interface OrderMapProps {
  order: Order;
}
const OrderMap = ({ order }: OrderMapProps) => {
  return (
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Order Locations</h2>
          <MapContainer center={{ lat: order.orderCustomerLocation.latitude, lng: order.orderCustomerLocation.longitude }} zoom={6} style={{ height: "400px", width: "100%" }} className='z-0'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={{ lat: order.orderCustomerLocation.latitude, lng: order.orderCustomerLocation.longitude }}>
                <Popup>
                    <div>
                    <p>Customer: <Link className='text-primary hover:text-primary/50' href={`/customers/${order.orderCustomerId}`}>{order.orderCustomerName}</Link></p>
                    </div>
                </Popup>
            </Marker>
            {
              (order.orderActivityType == "AcceptedByDelivery" || order.orderActivityType == "ShippedByDelivery" || order.orderActivityType == "AcceptedByProvider" || order.orderActivityType == "CanceledByCustomerAfterDeliveryAcceptIt" || order.orderActivityType == "CanceledByProviderBeforeDeliveryAcceptIt" || order.orderActivityType == "CanceledByCustomerBeforeDeliveryAcceptAfterProviderAccept" || order.orderActivityType == "CompletedByDelivery" || order.orderActivityType == "DeliveredByDelivery" || order.orderActivityType == "CanceledByDelivery") && (
                <>
                  <Marker position={{ lat: order.orderProviderLocation?.latitude, lng: order.orderProviderLocation?.longitude }}>
                    <Popup>
                      <div>
                        <p>Provider: <Link className='text-primary hover:text-primary/50' href={`/providers/${order.orderProviderId}`}>{order.orderProviderName}</Link></p>
                      </div>
                    </Popup>
                  </Marker>
                  {
                    (order.orderActivityType == "AcceptedByDelivery" || order.orderActivityType == "ShippedByDelivery") && (
                      
                      <Marker position={{ lat: order.orderDeliveryLocation?.latitude, lng: order.orderDeliveryLocation?.longitude }}>
                      <Popup>
                        <div>
                          <p>Delivery: <Link className='text-primary hover:text-primary/50' href={`/deliveries/${order.orderDeliveryId}`}>{order.orderDeliveryName}</Link></p>
                        </div>
                      </Popup>
                    </Marker>
                    )
                  }
                </>
              )
            }
          </MapContainer>
      </div>
    
  );
};

export default OrderMap;