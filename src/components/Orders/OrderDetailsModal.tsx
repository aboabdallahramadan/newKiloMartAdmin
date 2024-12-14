import React from 'react'
import { Order } from '@/types/order'
import ClickOutside from '../ClickOutside'
import Link from 'next/link';

interface OrderDetailsProps {
    Order: Order;
    handleCloseModal: Function
}

const OrderDetailsModal: React.FC<OrderDetailsProps> = ({Order, handleCloseModal}) => {
    return (
      <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center p-4">
        <ClickOutside onClick={() => handleCloseModal()}>
          <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-3xl w-full max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-dark-3">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-dark dark:text-white">Order Details</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  Order.orderStatus === 'Completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                }`}>
                  {Order.orderStatus}
                </span>
              </div>
            </div>

            {/* Order Information */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Customer Information</h4>
                    <Link href={`/customers/${Order.orderCustomerId}`} className="text-primary hover:text-primary/80">
                      {Order.orderCustomerName}
                    </Link>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Provider Information</h4>
                    <Link href={`/providers/${Order.orderProviderId}`} className="text-primary hover:text-primary/80">
                      {Order.orderProviderName}
                    </Link>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Delivery Information</h4>
                    <Link href={`/deliveries/${Order.orderDeliveryId}`} className="text-primary hover:text-primary/80">
                      {Order.orderDeliveryName}
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Order Details</h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Order ID:</span>
                        <span className="font-medium">{Order.orderId}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Order Date:</span>
                        <span className="font-medium">{new Date(Order.orderDate).toLocaleDateString()}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Payment Method:</span>
                        <span className="font-medium">{Order.orderPaymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Fees</h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Delivery Fee:</span>
                        <span className="font-medium">{Order.orderDeliveryFee} RS</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Service Fee:</span>
                        <span className="font-medium">{Order.orderServiceFee} RS</span>
                      </p>
                      <p className="flex justify-between text-lg font-bold">
                        <span className="text-dark dark:text-white">Total:</span>
                        <span className="text-primary">{Order.orderTotal} RS</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-dark dark:text-white mb-4">Order Items</h4>
                <div className="space-y-4">
                  {Order.orderItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${item.imageUrl}`} 
                        alt={item.productName} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Link href={`/products/${item.productId}`} className="text-primary hover:text-primary/80 font-medium">
                          {item.productName}
                        </Link>
                        <div className="flex justify-between mt-2">
                          <span className="text-dark dark:text-white">Quantity: {item.quantity}</span>
                          <span className="font-medium text-dark dark:text-white">{item.price} RS</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-dark-3">
              <button 
                onClick={() => handleCloseModal()} 
                className="w-full py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </ClickOutside>
      </div>
    )
}

export default OrderDetailsModal
