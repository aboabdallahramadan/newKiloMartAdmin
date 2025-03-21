"use client"
import React, { useState, useEffect } from 'react'
import { DeliveryProfile } from '../../types/deliveryProfile'
import ReviewProfileModal from '../Users/ReviewProfileModal'
import { toast } from 'react-toastify';


interface DeliveryDetailsModalProps {
    deliveryId: number;
    onClose: () => void;
  }
const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({ deliveryId, onClose }) => {
  const [selectedProfile, setSelectedProfile] = useState<DeliveryProfile | null>(null);
  const [deliveryProfiles, setDeliveryProfiles] = useState<DeliveryProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const openAcceptModal = () => setIsAcceptModalOpen(true);
  const closeAcceptModal = () => setIsAcceptModalOpen(false);
  const openRejectModal = () => setIsRejectModalOpen(true);
  const closeRejectModal = () => setIsRejectModalOpen(false);
  
  useEffect(() => {
        const fetchProfiles = async () => {
        setIsLoading(true);
      
          try {
            const response = await fetch(`/backend/api/delivery-profile/filter?deliveryId=${deliveryId}&pageNumber=1&pageSize=999999`);
            const data = await response.json();
            if(data.status) {
              setDeliveryProfiles(data.data.items);
            }
            else {
              console.log("Error:" , data.message);
            }
          } catch (error) {
            console.error('Error fetching profiles:', error);
          }
      
      
        setIsLoading(false)
        }
        fetchProfiles();
      
       }, []);

  const acceptProfile = async (id: number,description: string) => {
    try {
      const response = await fetch(`/backend/api/delivery-profile/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "id": id,
          "reviewDescription": description
        }),
      });
      const data = await response.json();
      if(data.status) {
        toast.success("Profile Accepted Successfully");
        window.location.reload();
      }
      else {
        toast.error("Error Accepting profile");
        console.log("Error Accepting profile", data.message);
      }
    } catch(error) {
      console.log("Error Accepting profile", error);
      toast.error("Error Accepting profile");
    }
  }
           
  const rejectProfile = async (id: number,description: string) => {
    try {
      const response = await fetch(`/backend/api/delivery-profile/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "id": id,
          "reviewDescription": description
        }),
      });
      const data = await response.json();
      if(data.status) {
        toast.success("Profile Rejected Successfully");
        window.location.reload();
      }
    } catch(error) {
      console.log("Error Rejecting profile", error);
      toast.error("Error Rejecting profile");
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center p-4">
        <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-dark-3 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-dark z-10">
            <h3 className="text-2xl font-bold text-dark dark:text-white">Delivery Details</h3>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            <div className="p-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 dark:text-white">Delivery Profiles</h2>
                    <select 
                    className="w-full p-3 border rounded-lg shadow-sm dark:bg-dark-2 dark:border-dark-3 focus:ring-2 focus:ring-primary transition-all"
                    onChange={(e) => {
                        const profile = deliveryProfiles.find(p => p.id === parseInt(e.target.value))
                        setSelectedProfile(profile || null)
                    }}
                    >
                    <option value="">Select a Delivery Profile</option>
                    {deliveryProfiles.map(profile => (
                        <option key={profile.id} value={profile.id}>
                        {profile.firstName} {profile.secondName}
                        </option>
                    ))}
                    </select>
                </div>

                {selectedProfile && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-dark-2 rounded-xl shadow-md">
                    {/* Profile Information Card */}
                    <div className=" p-6 space-y-6 lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold dark:text-white border-b pb-2">Basic Information</h3>
                            <div className="space-y-2">
                            <InfoItem label="Full Name" value={`${selectedProfile.firstName} ${selectedProfile.secondName}`} />
                            <InfoItem label="National Name" value={selectedProfile.nationalName} />
                            <InfoItem label="National Id" value={selectedProfile.nationalId} />
                            <InfoItem label="License Number" value={selectedProfile.licenseNumber} />
                            <InfoItem label="License Expired Date" value={new Date(selectedProfile.licenseExpiredDate).toLocaleDateString()} />
                            <InfoItem label="Driving License Number" value={selectedProfile.drivingLicenseNumber} />
                            <InfoItem label="Driving License Expired Date" value={new Date(selectedProfile.drivingLicenseExpiredDate).toLocaleDateString()} />
                            <InfoItem label="Vehicle Number" value={selectedProfile.vehicleNumber} />
                            <InfoItem label="Vehicle Model" value={selectedProfile.vehicleModel} />
                            <InfoItem label="Vehicle Type" value={selectedProfile.vehicleType} />
                            <InfoItem label="Vehicle Year" value={selectedProfile.vehicleYear} />
                            </div>
                        </div>

                        {/* Status and Contact */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold dark:text-white border-b pb-2">Status</h3>
                            <div className="space-y-2">
                            <InfoItem label="Added in" value={new Date(selectedProfile.submitDate).toLocaleDateString()} />
                            <StatusBadge status={selectedProfile.isRejected ? 'rejected' : selectedProfile.isAccepted ? 'accepted' : 'pending'} />
                            {(selectedProfile.isAccepted || selectedProfile.isRejected) ? (
                                <InfoItem label="Review Notes" value={selectedProfile.reviewDescription} />
                            ) : (
                                <div className="flex gap-2 mt-4">
                                <button 
                                    onClick={openAcceptModal}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Accept Profile
                                </button>
                                <button 
                                    onClick={openRejectModal}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Reject Profile
                                </button>
                                </div>
                            )}
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xl font-semibold dark:text-white border-b pb-2">Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DocumentLink 
                                label="Vehicle Photo File"
                                url={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${selectedProfile.vehiclePhotoFileUrl}`}
                            />
                            <DocumentLink 
                                label="Driving License File"
                                url={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${selectedProfile.drivingLicenseFileUrl}`}
                            />
                            <DocumentLink 
                                label="Vehicle License File"
                                url={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${selectedProfile.vehicleLicenseFileUrl}`}
                            />
                            <DocumentLink 
                                label="National Iqama ID File"
                                url={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${selectedProfile.nationalIqamaIDFileUrl}`}
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    {isAcceptModalOpen && (
                      <ReviewProfileModal 
                        onConfirm={(description) => {
                          acceptProfile(selectedProfile.id, description);
                          closeAcceptModal();
                        }}
                        onCancel={closeAcceptModal}
                      />
                    )}
                    {isRejectModalOpen && (
                      <ReviewProfileModal 
                        onConfirm={(description) => {
                          rejectProfile(selectedProfile.id, description);
                          closeRejectModal();
                        }}
                        onCancel={closeRejectModal}
                      />
                    )}
                    </div>
                )}
            </div>
        </div>
        
    </div>

  )
}

// Helper Components
const InfoItem = ({ label, value }: { label: string, value: string | undefined | null }) => (
  <div className="flex gap-2 items-center justify-between">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="text-sm text-gray-500 dark:text-gray-400">{value}</span>
  </div>
)

const StatusBadge = ({ status }: { status: 'accepted' | 'rejected' | 'pending' }) => {
  const styles = {
    accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]} capitalize`}>
        {status}
      </span>
    </div>
  )
}

const DocumentLink = ({ label, url }: { label: string, url: string }) => (
  <div className="p-4 border rounded-lg dark:border-dark-3">
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</p>
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-primary hover:underline"
    >
      <span>View Document</span>
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
)


export default DeliveryDetailsModal
