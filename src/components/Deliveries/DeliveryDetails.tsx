"use client";
import React, {useState, useEffect} from 'react';
import { useParams } from 'next/navigation';
import { Delivery } from '@/types/delivery';
import ElementLoader from '../common/ElementLoader';

const DeliveryDetails = () => {
  const  { id } = useParams();
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!id) return; // wait until query param is available
  
      const fetchProvider = async () => {
        try {
          const res = await fetch(
            `/backend/api/admin-panel/delivery-by-id?deliveryId=${id}`
          );
  
          if (!res.ok) {
            throw new Error('Failed to fetch provider data');
          }
  
          const data = await res.json();
          setDelivery(data.data);
        } catch (err: any) {
          console.error(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProvider();
    }, [id]);
  return (
    <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      {
        !isLoading ? (
          <>
          {
            delivery ? (
            <>
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
                  <div className='flex items-end gap-1 justify-start'>
                    <InfoRow label="Email" value={delivery.email} />
                    {delivery.isEmailVerified && (
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* License Information Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-dark dark:text-white mb-4">License Details</h3>
                <div className="space-y-3">
                  <InfoRow label="National ID" value={delivery.nationalId} />
                  <InfoRow label="National Name" value={delivery.nationalName} />
                  <InfoRow label="Driving License Number" value={delivery.drivingLicenseNumber} />
                  <InfoRow label="Driving License Expiry" value={new Date(delivery.drivingLicenseExpiredDate).toLocaleDateString()} />
                  <InfoRow label="License Number" value={delivery.licenseNumber} />
                  <InfoRow label="License Expiry" value={new Date(delivery.licenseExpiredDate).toLocaleDateString()} />
                </div>
              </div>

              {/* Statistics Section */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-xl font-semibold text-dark dark:text-white mb-4">Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard label="Total Orders" value={delivery.totalOrders.toString() || "0"}  className=" text-primary"/>
                  <StatCard label="Available Balance" value={`${(delivery.receivedBalance - delivery.withdrawalBalance) || 0} SAR`} className="text-green-600" />
                  <StatCard label="Total Balance" value={`${delivery.receivedBalance || 0} SAR`} className="text-green-600" />
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-8 md:col-span-2">
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Vehicle Photo</p>
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${delivery.vehiclePhotoFileUrl}`} 
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Driving License</p>
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${delivery.drivingLicenseFileUrl}`} 
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Vehicle License</p>
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${delivery.vehicleLicenseFileUrl}`} 
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
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">National Iqama ID</p>
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${delivery.nationalIqamaIDFileUrl}`} 
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
            </>
            ) : (
              <>
              <p>Error getting data {error}</p>
              </>
            )
          }
          </>
        ) :(
          <>
          <ElementLoader></ElementLoader>
          </>
        )
      }
      
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-gray-500 dark:text-gray-400 break-all">{label}</span>
    <span className="text-base font-medium text-gray-800 dark:text-gray-200 break-all">{value}</span>
  </div>
);

const StatCard = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className={`text-lg font-semibold ${className}`}>{value}</p>
  </div>
);

export default DeliveryDetails;
