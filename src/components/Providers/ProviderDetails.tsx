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
    <div className="w-full mx-auto">
      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-dark dark:text-white">{provider.companyName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Provider ID: {provider.providerId}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              provider.isActive 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
            }`}>
              {provider.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                  <p className="text-base font-medium text-dark dark:text-white">{provider.displayName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">National Approval ID</p>
                  <p className="text-base font-medium text-dark dark:text-white">{provider.nationalApprovalId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-base font-medium text-dark dark:text-white">{provider.email}</p>
                </div>
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Owner Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Owner Name</p>
                  <p className="text-base font-medium text-dark dark:text-white">{provider.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Owner National ID</p>
                  <p className="text-base font-medium text-dark dark:text-white">{provider.ownerNationalId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-xl font-bold text-primary">{provider.totalOrders}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-xl font-bold text-primary">{provider.totalProducts}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
              <p className="text-xl font-bold text-green-500">{provider.availableBalance} RS</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
              <p className="text-xl font-bold text-green-500">{provider.totalBalance} RS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
