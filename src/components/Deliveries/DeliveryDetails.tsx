import React from 'react';
import { Delivery } from '@/types/delivery';

const delivery: Delivery = {
  deliveryId: 1,
  userId: 1,
  displayName: 'Delivery 1',
  firstName: 'John',
  secondName: 'Doe',
  nationalId: '1234567890',
  nationalName: 'John Doe',
  drivingLicenseExpiredDate: '2024-12-31',
  drivingLicenseNumber: 'DL123456',
  licenseExpiredDate: '2024-12-31',
  licenseNumber: 'L789012',
  email: 'john.doe@example.com',
  isActive: true,
  totalOrders: 10,
  availableBalance: 1000,
  totalBalance: 100000,
};

const DeliveryDetails = () => {
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-3 border-b border-gray-200 dark:border-dark-3">
        <div className="pb-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className='flex flex-col gap-2'>
              <h2 className="text-2xl font-bold text-dark dark:text-white">{delivery.displayName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delivery ID: {delivery.deliveryId}</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              delivery.isActive 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
            }`}>
              {delivery.isActive ? 'Active' : 'Inactive'}
            </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-4">Personal Information</h3>
          <div className="space-y-3">
            <InfoRow label="Display Name" value={delivery.displayName} />
            <InfoRow label="First Name" value={delivery.firstName} />
            <InfoRow label="Second Name" value={delivery.secondName} />
            <InfoRow label="Email" value={delivery.email} />
          </div>
        </div>

        {/* License Information Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-4">License Details</h3>
          <div className="space-y-3">
            <InfoRow label="National ID" value={delivery.nationalId} />
            <InfoRow label="National Name" value={delivery.nationalName} />
            <InfoRow label="Driving License Number" value={delivery.drivingLicenseNumber} />
            <InfoRow label="Driving License Expiry" value={delivery.drivingLicenseExpiredDate} />
            <InfoRow label="License Number" value={delivery.licenseNumber} />
            <InfoRow label="License Expiry" value={delivery.licenseExpiredDate} />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-4">Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Orders" value={`${delivery.totalOrders}`} />
            <StatCard label="Available Balance" value={`${delivery.availableBalance} RS`} className="text-green-600" />
            <StatCard label="Total Balance" value={`${delivery.totalBalance} RS`} className="text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-base font-medium text-gray-800 dark:text-gray-200">{value}</span>
  </div>
);

const StatCard = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className={`text-lg font-semibold ${className}`}>{value}</p>
  </div>
);

export default DeliveryDetails;
