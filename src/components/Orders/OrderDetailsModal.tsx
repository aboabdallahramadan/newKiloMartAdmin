import React from 'react'
import { Order } from '@/types/order'
import ClickOutside from '../ClickOutside'
import Link from 'next/link';

interface OrderDetailsProps {
    Order: Order;
    handleCloseModal: Function
}

const OrderDetailsModal : React.FC<OrderDetailsProps> = ({Order, handleCloseModal}) => {

    return (
    <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center max-h-screen">
            <ClickOutside onClick={() => handleCloseModal()}>
              <div className="bg-white dark:bg-gray-dark p-6 rounded-lg shadow-xl max-w-lg w-full">
                <h3 className="text-2xl font-semibold mb-6 text-center">Order Details</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <p><strong>Order ID:</strong> {Order.orderId}</p>
                  <p><strong>Order Date:</strong> {new Date(Order.orderDate).toLocaleDateString()}</p>
                  <p><strong>Order Status:</strong> {Order.orderStatus}</p>
                  <p><strong>Order Total:</strong> {Order.orderTotal} RS</p>
                  <p><strong>Customer Name:</strong> <Link className='text-primary hover:text-primary/50' href={`/customers/${Order.orderCustomerId}`}> {Order.orderCustomerName}</Link></p>
                  <p><strong>Provider Name:</strong> <Link className='text-primary hover:text-primary/50' href={`/providers/${Order.orderProviderId}`}> {Order.orderProviderName}</Link></p>
                  <p><strong>Delivery Name:</strong> <Link className='text-primary hover:text-primary/50' href={`/deliveries/${Order.orderDeliveryId}`}> {Order.orderDeliveryName}</Link></p>
                  <p><strong>Delivery Fee:</strong> {Order.orderDeliveryFee} RS</p>
                  <p><strong>Service Fee:</strong> {Order.orderServiceFee} RS</p>
                  <p><strong>Payment Method:</strong> {Order.orderPaymentMethod}</p>
                </div>
                <div className="overflow-y-auto max-h-80 grid grid-cols-1 gap-4 border-t border-gray-200 pt-4">
                  {Order.orderItems.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4 border-b border-gray-300 pb-2">
                      <img src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${item.imageUrl}`} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <p><strong>Product Name:</strong> <Link className='text-primary hover:text-primary/50' href={`/products/${item.productId}`}>{item.productName}</Link></p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> {item.price} RS</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleCloseModal()} className="mt-6 w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300">
                  Close
                </button>
              </div>
            </ClickOutside>
          </div>
  )
}

export default OrderDetailsModal