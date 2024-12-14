"use client";
import React from 'react';
import { CustomerDetails as Details } from '@/types/customerDetails';

const customer : Details = {
  customerId: 1258,
  displayName: "John Smith",
  firstName: "John",
  secondName: "Smith",
  nationalId: "1234567890",
  nationalName: "Saudi Arabia",
  phone: "+966 50 123 4567",
  phoneConfirmed: true,
  isActive: true,
  totalOrders: 25,
  totalRevenue: 15750.50
};

const CustomerDetails = () => {
  return (
    <div className="w-full mx-auto">
      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-dark dark:text-white">{customer.displayName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID: {customer.customerId}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              customer.isActive 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
            }`}>
              {customer.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">First Name</p>
                  <p className="text-base font-medium text-dark dark:text-white">{customer.firstName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Second Name</p>
                  <p className="text-base font-medium text-dark dark:text-white">{customer.secondName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">National ID</p>
                  <p className="text-base font-medium text-dark dark:text-white">{customer.nationalId}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nationality</p>
                  <p className="text-base font-medium text-dark dark:text-white">{customer.nationalName}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-medium text-dark dark:text-white">{customer.phone}</p>
                    {customer.phoneConfirmed && (
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">Total Orders</h3>
              <p className="text-2xl font-bold text-primary">{customer.totalOrders}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">Total Revenue</h3>
              <p className="text-2xl font-bold text-primary">{customer.totalRevenue.toFixed(2)} RS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
