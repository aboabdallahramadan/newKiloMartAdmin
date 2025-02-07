"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Order } from '@/types/order';
import ElementLoader from '../common/ElementLoader';
import OrderDetailsModal from '../Orders/OrderDetailsModal';

const CustomerOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/backend/api/admin-panel/customers-orders-by-id?customerId=${id}&language=2`);
        const data = await response.json();

        if (data.status) {
          setOrders(data.data);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  const handleShowDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Customer&apos;s Orders</h2>
        {loading ? (
          <ElementLoader />
        ) : (
          <div className="overflow-y-auto max-h-[600px]">
            {
              orders.length === 0 ? (
                <p className="text-gray-500 text-center">No orders found.</p>
              ) : (
                <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                  <th className="px-1 py-4 font-medium text-dark dark:text-white xl:pl-2">
                    ID & Total
                  </th>
                  <th className="px-1 py-4 font-medium text-dark dark:text-white hidden sm:block">
                    Date
                  </th>
                  <th className="px-1 py-4 font-medium text-dark dark:text-white">
                    Status
                  </th>
                  <th className="px-1 py-4 text-right font-medium text-dark dark:text-white xl:pr-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td
                      className={`border-[#eee] px-1 py-4 dark:border-dark-3 xl:pl-2 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <h5 className="text-dark dark:text-white">
                        {order.orderDetails.id}
                      </h5>
                      <p className="mt-[3px] text-body-sm font-medium">
                        {order.orderDetails.totalPrice}SAR
                      </p>
                    </td>
                    <td
                      className={`border-[#eee] px-1 py-4 dark:border-dark-3 ${index === orders.length - 1 ? "border-b-0" : "border-b"} hidden sm:table-cell`}
                    >
                      <p className="text-dark dark:text-white">
                      {new Date(order.orderDetails.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td
                      className={`border-[#eee] px-1 py-4 dark:border-dark-3 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <p
                        className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                          order.orderDetails.orderStatus === "COMPLETED"
                            ? "bg-[#219653]/[0.08] text-[#219653]"
                            : order.orderDetails.orderStatus === "CANCELED"
                              ? "bg-[#D34053]/[0.08] text-[#D34053]"
                              : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                        }`}
                      >
                        {order.orderDetails.orderStatus}
                      </p>
                    </td>
                    <td
                      className={`border-[#eee] px-1 py-4 dark:border-dark-3 xl:pr-2 ${index === orders.length - 1 ? "border-b-0" : "border-b"}`}
                    >
                      <div className="flex items-center justify-end space-x-3.5">
                        <button className="hover:text-primary" title='view' onClick={() => handleShowDetails(order)}>
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99935 6.87492C8.27346 6.87492 6.87435 8.27403 6.87435 9.99992C6.87435 11.7258 8.27346 13.1249 9.99935 13.1249C11.7252 13.1249 13.1243 11.7258 13.1243 9.99992C13.1243 8.27403 11.7252 6.87492 9.99935 6.87492ZM8.12435 9.99992C8.12435 8.96438 8.96382 8.12492 9.99935 8.12492C11.0349 8.12492 11.8743 8.96438 11.8743 9.99992C11.8743 11.0355 11.0349 11.8749 9.99935 11.8749C8.96382 11.8749 8.12435 11.0355 8.12435 9.99992Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99935 2.70825C6.23757 2.70825 3.70376 4.96175 2.23315 6.8723L2.20663 6.90675C1.87405 7.3387 1.56773 7.73652 1.35992 8.20692C1.13739 8.71064 1.04102 9.25966 1.04102 9.99992C1.04102 10.7402 1.13739 11.2892 1.35992 11.7929C1.56773 12.2633 1.87405 12.6611 2.20664 13.0931L2.23316 13.1275C3.70376 15.0381 6.23757 17.2916 9.99935 17.2916C13.7611 17.2916 16.2949 15.0381 17.7655 13.1275L17.792 13.0931C18.1246 12.6612 18.431 12.2633 18.6388 11.7929C18.8613 11.2892 18.9577 10.7402 18.9577 9.99992C18.9577 9.25966 18.8613 8.71064 18.6388 8.20692C18.431 7.73651 18.1246 7.33868 17.792 6.90673L17.7655 6.8723C16.2949 4.96175 13.7611 2.70825 9.99935 2.70825ZM3.2237 7.63475C4.58155 5.87068 6.79132 3.95825 9.99935 3.95825C13.2074 3.95825 15.4172 5.87068 16.775 7.63475C17.1405 8.10958 17.3546 8.3933 17.4954 8.71204C17.627 9.00993 17.7077 9.37403 17.7077 9.99992C17.7077 10.6258 17.627 10.9899 17.4954 11.2878C17.3546 11.6065 17.1405 11.8903 16.775 12.3651C15.4172 14.1292 13.2074 16.0416 9.99935 16.0416C6.79132 16.0416 4.58155 14.1292 3.2237 12.3651C2.85821 11.8903 2.64413 11.6065 2.50332 11.2878C2.37171 10.9899 2.29102 10.6258 2.29102 9.99992C2.29102 9.37403 2.37171 9.00993 2.50332 8.71204C2.64413 8.3933 2.85821 8.10958 3.2237 7.63475Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              )
            }
            
          </div>
        )}

        {selectedOrder && (
          <OrderDetailsModal Order={selectedOrder} handleCloseModal={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;