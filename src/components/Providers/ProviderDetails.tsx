"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Provider } from '@/types/provider';
import ElementLoader from '../common/ElementLoader';

const ProviderDetails = () => {
  const providerId = useParams().id;

  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) return; // wait until query param is available

    const fetchProvider = async () => {
      try {
        const res = await fetch(
          `/backend/api/admin-panel/provider-by-id?providerId=${providerId}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch provider data');
        }

        const data = await res.json();
        // Assuming the provider data is available under data.provider.
        setProvider(data.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  if (isLoading) {
    return (
      <div className="w-full mx-auto">
        <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md p-4">
          <ElementLoader />
        </div>
      </div>
      );
  }

  if (error || !provider) {
    return (
    <div className="w-full mx-auto">
      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md p-4">
        Error: {error || 'Provider not found'}
      </div>
    </div>
    );
  }  return (
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
                  <p className="text-base font-medium text-dark dark:text-white flex items-center justify-start gap-1">
                    {provider.email} 
                    {provider.isEmailVerified && (
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </span>
                    )}
                  </p>
                  
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
              <p className="text-xl font-bold text-primary">{provider.totalOrders || 0}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-xl font-bold text-primary">{provider.totalProducts || 0}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
              <p className="text-xl font-bold text-green-500">{provider.availableBalance || 0} RS</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
              <p className="text-xl font-bold text-green-500">{provider.receivedBalance || 0} RS</p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Owner National Approval File</p>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${provider.ownerNationalApprovalFile}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium"
                    download
                  >
                    Download Document
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Ownership Document File</p>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${provider.ownershipDocumentFile}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium"
                    download
                  >
                    Download Document
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
