import React from 'react';
import { Delivery } from '@/types/delivery';

const delivery: Delivery = {
  displayName: 'Provider 1',
  firstName: 'John',
  secondName: 'Doe',
  companyName: 'Provider Company',
  deliveryId: 1,
  userId: 1,
  nationalApprovalId: '1',
  ownerName: 'John Doe',
  ownerNationalId: '1234567890',
  email: '+9625558888',
  isActive: true,
  totalOrders: 10,
  availableBalance: 1000,
  totalBalance: 1000,
};

const DeliveryDetails = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Delivery Details</h2>
      <div className="flex flex-col gap-2">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Display Name:</strong> {delivery.displayName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>First Name:</strong> {delivery.firstName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Second Name:</strong> {delivery.secondName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Company Name:</strong> {delivery.companyName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>National Approval ID:</strong> {delivery.nationalApprovalId}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Owner Name:</strong> {delivery.ownerName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Owner National ID:</strong> {delivery.ownerNationalId}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Phone:</strong> {delivery.email}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Active:</strong> {delivery.isActive ? 'Yes' : 'No'}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Total Orders:</strong> {delivery.totalOrders}</p>
          <p className="text-lg font-medium text-green-600 dark:text-green-300"><strong className='font-bold'>Available Balance:</strong> {delivery.availableBalance}RS</p>
          <p className="text-lg font-medium text-green-600 dark:text-green-300"><strong className='font-bold'>Total Balance:</strong> {delivery.totalBalance}RS</p>
      </div>
    </div>
  );
};

export default DeliveryDetails;