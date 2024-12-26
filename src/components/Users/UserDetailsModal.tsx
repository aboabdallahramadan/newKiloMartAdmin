import React from 'react';
import { Provider } from '@/types/provider';
import { Delivery } from '@/types/delivery'; 
import { AccountRequest } from '@/types/accountRequest';
import ClickOutside from '../ClickOutside';

interface UserDetailsModalProps {
  user: AccountRequest["user"],
  handleCloseModal: Function
}

const UserDetailsModal = ({user , handleCloseModal}: UserDetailsModalProps) => {
  const isProvider = (user: AccountRequest["user"]): user is Omit<Provider, "isActive" | "totalOrders" | "totalProducts" | "availableBalance" | "totalBalance"> => {
    return 'providerId' in user;
  };
  
  const isDelivery = (user: AccountRequest["user"]): user is Omit<Delivery, "isActive" | "totalOrders" | "availableBalance" | "totalBalance"> => {
    return 'deliveryId' in user;
  };
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4">
        <ClickOutside onClick={() => handleCloseModal()}>
        <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-3xl w-full max-h-screen overflow-y-auto">

          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-dark-3">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-dark dark:text-white">{isProvider(user) && "Provider"}{isDelivery(user) && "Delivery"} Details</h3>
            </div>
          </div>
            {/* User Information  */}
            {
              (isProvider(user) && (
                <div className="w-full mx-auto">
                  <div className="bg-white dark:bg-gray-dark rounded-lg shadow-md">
                    {/* Header Section */}
                    <div className="p-6 border-b border-gray-200 dark:border-dark-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h2 className="text-2xl font-bold text-dark dark:text-white">{user.companyName}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Provider ID: {user.providerId}</p>
                          </div>
                        </div>
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
                              <p className="text-base font-medium text-dark dark:text-white">{user.displayName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">National Approval ID</p>
                              <p className="text-base font-medium text-dark dark:text-white">{user.nationalApprovalId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                              <p className="text-base font-medium text-dark dark:text-white flex items-center justify-start gap-1">
                                {user.email} 
                                {user.isEmailVerified && (
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
                              <p className="text-base font-medium text-dark dark:text-white">{user.ownerName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Owner National ID</p>
                              <p className="text-base font-medium text-dark dark:text-white">{user.ownerNationalId}</p>
                            </div>
                          </div>
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
                                href={user.ownerNationalApprovalFile} 
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
                                href={user.ownershipDocumentFile} 
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
              )) || (isDelivery(user)) && (
                <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
                  <div className="mb-3 border-b border-gray-200 dark:border-dark-3">
                    <div className="pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className='flex flex-col gap-2'>
                          <h2 className="text-2xl font-bold text-dark dark:text-white">{user.displayName}</h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Delivery ID: {user.deliveryId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-dark dark:text-white mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <InfoRow label="Display Name" value={user.displayName} />
                        <InfoRow label="First Name" value={user.firstName} />
                        <InfoRow label="Second Name" value={user.secondName} />
                        <div className='flex items-end gap-1 justify-start'>
                          <InfoRow label="Email" value={user.email} />
                          {user.isEmailVerified && (
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
                        <InfoRow label="National ID" value={user.nationalId} />
                        <InfoRow label="National Name" value={user.nationalName} />
                        <InfoRow label="Driving License Number" value={user.drivingLicenseNumber} />
                        <InfoRow label="Driving License Expiry" value={user.drivingLicenseExpiredDate} />
                        <InfoRow label="License Number" value={user.licenseNumber} />
                        <InfoRow label="License Expiry" value={user.licenseExpiredDate} />
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
                              href={user.VehiclePhotoFile} 
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
                              href={user.DrivingLicenseFile} 
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
                              href={user.VehicleLicenseFile} 
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
                              href={user.NationalIqamaIDFile} 
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
              )
            }
            
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
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-gray-500 dark:text-gray-400 break-all">{label}</span>
    <span className="text-base font-medium text-gray-800 dark:text-gray-200 break-all">{value}</span>
  </div>
);


export default UserDetailsModal;
