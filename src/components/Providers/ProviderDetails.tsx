import React from 'react';
import { Provider } from '@/types/provider';

const provider: Provider = {
  displayName: 'Provider 1',
  firstName: 'John',
  secondName: 'Doe',
  companyName: 'Provider Company',
  providerId: 1,
  userId: 1,
  nationalApprovalId: '1',
  ownerName: 'John Doe',
  ownerNationalId: '1234567890',
  email: '+966855555559',
  isActive: true,
  totalOrders: 10,
  totalProducts: 10,
  availableBalance: 1000,
  totalBalance: 1000,
};

const ProviderDetails = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider Details</h2>
      <div className="flex flex-col gap-2">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Display Name:</strong> {provider.displayName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>First Name:</strong> {provider.firstName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Second Name:</strong> {provider.secondName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Company Name:</strong> {provider.companyName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>National Approval ID:</strong> {provider.nationalApprovalId}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Owner Name:</strong> {provider.ownerName}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Owner National ID:</strong> {provider.ownerNationalId}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Phone:</strong> {provider.email}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Active:</strong> {provider.isActive ? 'Yes' : 'No'}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Total Orders:</strong> {provider.totalOrders}</p>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300"><strong className='font-bold'>Total Products:</strong> {provider.totalProducts}</p>
          <p className="text-lg font-medium text-green-600 dark:text-green-300"><strong className='font-bold'>Available Balance:</strong> {provider.availableBalance}RS</p>
          <p className="text-lg font-medium text-green-600 dark:text-green-300"><strong className='font-bold'>Total Balance:</strong> {provider.totalBalance}RS</p>
      </div>
    </div>
  );
};

export default ProviderDetails;