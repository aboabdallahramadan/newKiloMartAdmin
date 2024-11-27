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
  email: 'john.doe@example.com',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Display Name:</strong> {provider.displayName}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>First Name:</strong> {provider.firstName}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Second Name:</strong> {provider.secondName}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Company Name:</strong> {provider.companyName}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>National Approval ID:</strong> {provider.nationalApprovalId}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Owner Name:</strong> {provider.ownerName}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Owner National ID:</strong> {provider.ownerNationalId}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Email:</strong> {provider.email}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Active:</strong> {provider.isActive ? 'Yes' : 'No'}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Total Orders:</strong> {provider.totalOrders}</p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300"><strong>Total Products:</strong> {provider.totalProducts}</p>
          <p className="text-sm font-medium text-green-600 dark:text-green-300"><strong>Available Balance:</strong> {provider.availableBalance}RS</p>
          <p className="text-sm font-medium text-green-600 dark:text-green-300"><strong>Total Balance:</strong> {provider.totalBalance}RS</p>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;