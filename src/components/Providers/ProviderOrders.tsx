"use client"
import { useEffect, useState } from 'react';
import { Order } from '@/types/order';
import ElementLoader from '../common/ElementLoader';
import ClickOutside from '../ClickOutside';

const ProviderOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // const fetchOrders = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_MAIN}/api/orders?providerId=4&page=${currentPage}&pageSize=${pageSize}`);
    //     const data = await response.json();

    //     if (data.status) {
    //       setOrders(data.data.data);
    //       setTotalCount(data.data.totalCount);
    //     } else {
    //       console.error("Failed to fetch orders:", data.message);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching orders:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchOrders();
    setOrders([{
      orderId: 1,
      orderDate: new Date().toISOString(),
      orderStatus: 'Pending',
      orderTotal: 100,
      orderCustomerId: 1,
      orderCustomerName: 'John Doe',
      orderDeliveryId: 1,
      orderDeliveryName: 'John Doe',
      orderItems: [
        {
          productId: 1,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 2,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 3,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 4,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
      ],
    },
    {
      orderId: 2,
      orderDate: new Date().toISOString(),
      orderStatus: 'Pending',
      orderTotal: 100,
      orderCustomerId: 1,
      orderCustomerName: 'John Doe',
      orderDeliveryId: 1,
      orderDeliveryName: 'John Doe',
      orderItems: [
        {
          productId: 1,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 2,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 3,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 4,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
      ],
    },
    {
      orderId: 3,
      orderDate: new Date().toISOString(),
      orderStatus: 'Pending',
      orderTotal: 100,
      orderCustomerId: 1,
      orderCustomerName: 'John Doe',
      orderDeliveryId: 1,
      orderDeliveryName: 'John Doe',
      orderItems: [
        {
          productId: 1,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 2,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 3,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 4,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
      ],
    },
    {
      orderId: 4,
      orderDate: new Date().toISOString(),
      orderStatus: 'Pending',
      orderTotal: 100,
      orderCustomerId: 1,
      orderCustomerName: 'John Doe',
      orderDeliveryId: 1,
      orderDeliveryName: 'John Doe',
      orderItems: [
        {
          productId: 1,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 2,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 3,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
        {
          productId: 4,
          productName: 'Product 1',
          quantity: 1,
          price: 100,
          imageUrl: 'images/3c88a556-9af7-4bce-a376-3373b4c71cad.jpg',
        },
      ],
    }]);
    setTotalCount(4);
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleShowDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider's Orders</h2>
      {loading ? (
        <ElementLoader />
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-dark">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2 hidden sm:block">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Total</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-b">
                <td className="py-2">{order.orderId}</td>
                <td className="py-2 hidden sm:block">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="py-2">{order.orderStatus}</td>
                <td className="py-2">{order.orderTotal} RS</td>
                <td className="py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => handleShowDetails(order)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Next
        </button>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
          <ClickOutside onClick={handleCloseModal}>
            <div className="bg-white dark:bg-gray-dark p-6 rounded-lg shadow-xl max-w-lg w-full">
              <h3 className="text-2xl font-semibold mb-6 text-center">Order Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                <p><strong>Order Total:</strong> {selectedOrder.orderTotal} RS</p>
                <p><strong>Customer ID:</strong> {selectedOrder.orderCustomerId}</p>
                <p><strong>Customer Name:</strong> {selectedOrder.orderCustomerName}</p>
                <p><strong>Delivery ID:</strong> {selectedOrder.orderDeliveryId}</p>
                <p><strong>Delivery Name:</strong> {selectedOrder.orderDeliveryName}</p>
              </div>
              <div className="overflow-y-auto max-h-80 grid grid-cols-1 gap-4 border-t border-gray-200 pt-4">
                {selectedOrder.orderItems.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 border-b border-gray-300 pb-2">
                    <img src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${item.imageUrl}`} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <p><strong>Product Name:</strong> {item.productName}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> {item.price} RS</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleCloseModal} className="mt-6 w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300">
                Close
              </button>
            </div>
          </ClickOutside>
        </div>
      )}
    </div>
  );
};

export default ProviderOrders;