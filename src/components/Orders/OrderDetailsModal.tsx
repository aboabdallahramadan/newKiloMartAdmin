import React from 'react'
import { Order } from '@/types/order'
import ClickOutside from '../ClickOutside'
import Link from 'next/link';
import OrderMap from '@/components/Orders/OrderMap';

interface OrderDetailsProps {
    Order: Order;
    handleCloseModal: Function
}

const OrderDetailsModal: React.FC<OrderDetailsProps> = ({Order, handleCloseModal}) => {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4">
        <ClickOutside onClick={() => handleCloseModal()}>
          <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-3xl w-full max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-dark-3">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-dark dark:text-white">Order Details</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  Order.orderDetails.orderStatus === "COMPLETED" 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                }`}>
                  {Order.orderDetails.orderStatus}
                </span>
              </div>
            </div>

            {/* Order Information */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Customer Information</h4>
                    <Link href={`/customers/${Order.orderDetails.customer}`} className="text-primary hover:text-primary/80">
                      {Order.orderDetails.customerDisplayName}
                    </Link>
                  </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Provider Information</h4>
                      <Link href={`/providers/${Order.orderDetails.provider}`} className="text-primary hover:text-primary/80">
                        {Order.orderDetails.providerDisplayName}
                      </Link>
                    </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Delivery Information</h4>
                          <Link href={`/deliveries/${Order.orderDetails.delivery}`} className="text-primary hover:text-primary/80">
                            {Order.orderDetails.deliveryDisplayName}
                          </Link>
                        </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Order Details</h4>
                    <div className="space-y-2">
                      <p className="flex justify-between gap-1">
                        <span className="text-dark dark:text-white">Order ID:</span>
                        <span className="font-medium">{Order.orderDetails.id}</span>
                      </p>
                      <p className="flex justify-between flex-col gap-1">
                        <span className="text-dark dark:text-white">Order Date:</span>
                        <span className="font-medium">{new Date(Order.orderDetails.date).toLocaleString()}</span>
                      </p>
                      <p className="flex justify-between gap-1">
                        <span className="text-dark dark:text-white">Payment Method:</span>
                        <span className="font-medium">{Order.orderDetails.paymentType == 1 ? "Cash" : "Card"}</span>
                      </p>
                      {/* <p className="flex justify-between flex-col">
                        <span className="text-dark dark:text-white">Order Status:</span>
                          <span className="font-medium">{Order.orderActivityType.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </p> */}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Fees</h4>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Subtotal:</span>
                        <span className="font-medium">{Order.orderDetails.itemsPrice} SAR</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Delivery Fee:</span>
                        <span className="font-medium">{Order.orderDetails.deliveryFee} SAR</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-dark dark:text-white">Service Fee:</span>
                        <span className="font-medium">{Order.orderDetails.systemFee} SAR</span>
                      </p>
                      <p className="flex justify-between text-lg font-bold">
                        <span className="text-dark dark:text-white">Total:</span>
                        <span className="text-primary">{Order.orderDetails.totalPrice} SAR</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-dark dark:text-white mb-4">Order Items</h4>
                <div className="space-y-4">
                  {Order.orderProductDetails.map((item , index) => (
                    <div key={index} className="flex items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${item.productImageUrl}`} 
                        alt={item.productName} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Link href={`/products/${item.productId}`} className="text-primary hover:text-primary/80 font-medium">
                          {item.productName}
                        </Link>
                        <div className="flex flex-col justify-between mt-2">
                          <span className="text-dark dark:text-white">Quantity: {item.itemQuantity}</span>
                          <span className="font-medium text-dark dark:text-white">{item.actualUnitPrice * item.itemQuantity} SAR</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='p-4'>
                <OrderMap order={Order} />
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
