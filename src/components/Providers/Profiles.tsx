"use client"
import React, { useState } from 'react'
import { ProviderProfile } from '../../types/providerProfile'
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ReviewProfileModal from '../Users/ReviewProfileModal'
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

const Profiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProviderProfile | null>(null)
      const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
      const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    
      const openAcceptModal = () => setIsAcceptModalOpen(true);
      const closeAcceptModal = () => setIsAcceptModalOpen(false);
      const openRejectModal = () => setIsRejectModalOpen(true);
      const closeRejectModal = () => setIsRejectModalOpen(false);
  
  // Mock data - replace with actual data fetching
  const providerProfiles: ProviderProfile[] = [
     {
       id: 1,
       firstName: "John",
       secondName: "Doe",
       nationalApprovalId: "NAP123456",
       companyName: "Fresh Foods Market",
       ownerName: "John Doe",
       ownerNationalId: "NID789012",
       ownershipDocumentFileUrl: "https://example.com/doc1.pdf",
       ownerNationalApprovalFileUrl: "https://example.com/doc2.pdf",
       locationName: "Downtown Store",
       longitude: 31.2357,
       latitude: 30.0444,
       buildingType: "Commercial",
       buildingNumber: "123",
       floorNumber: "1",
       apartmentNumber: "101",
       streetNumber: "45",
       city: "Cairo",
       phoneNumber: "+201234567890",
       isAccepted: true,
       isRejected: false,
       submitDate: new Date("2024-01-15"),
       reviewDate: new Date("2024-01-20"),
       providerId: 1001,
       isActive: true,
       reviewDescription: "All documents verified successfully"
     },
     {
       id: 2,
       firstName: "Sarah",
       secondName: "Smith",
       nationalApprovalId: "NAP789012",
       companyName: "City Grocers",
       ownerName: "Sarah Smith",
       ownerNationalId: "NID345678",
       ownershipDocumentFileUrl: "https://example.com/doc3.pdf",
       ownerNationalApprovalFileUrl: "https://example.com/doc4.pdf",
       locationName: "Suburban Branch",
       longitude: 31.2456,
       latitude: 30.0533,
       buildingType: "Retail",
       buildingNumber: "456",
       floorNumber: "2",
       apartmentNumber: "202",
       streetNumber: "78",
       city: "Cairo",
       phoneNumber: "+201122334455",
       isAccepted: false,
       isRejected: false,
       submitDate: new Date("2024-02-01"),
       reviewDate: new Date("2024-02-05"),
       providerId: 1002,
       isActive: true,
       reviewDescription: "Pending review"
     },
     {
       id: 3,
       firstName: "Mohamed",
       secondName: "Ahmed",
       nationalApprovalId: "NAP345678",
       companyName: "Express Mart",
       ownerName: "Mohamed Ahmed",
       ownerNationalId: "NID901234",
       ownershipDocumentFileUrl: "https://example.com/doc5.pdf",
       ownerNationalApprovalFileUrl: "https://example.com/doc6.pdf",
       locationName: "City Center",
       longitude: 31.2789,
       latitude: 30.0622,
       buildingType: "Mall",
       buildingNumber: "789",
       floorNumber: "3",
       apartmentNumber: "303",
       streetNumber: "90",
       city: "Cairo",
       phoneNumber: "+201099887766",
       isAccepted: true,
       isRejected: false,
       submitDate: new Date("2024-01-25"),
       reviewDate: new Date("2024-01-30"),
       providerId: 1003,
       isActive: true,
       reviewDescription: "Approved with premium status"
     }
   ]

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Provider Profiles</h2>
        <select 
          className="w-full p-3 border rounded-lg shadow-sm dark:bg-dark-2 dark:border-dark-3 focus:ring-2 focus:ring-primary transition-all"
          onChange={(e) => {
            const profile = providerProfiles.find(p => p.id === parseInt(e.target.value))
            setSelectedProfile(profile || null)
          }}
        >
          <option value="">Select a Provider Profile</option>
          {providerProfiles.map(profile => (
            <option key={profile.id} value={profile.id}>
              {profile.companyName} - {profile.ownerName}
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
                  <InfoItem label="Company Name" value={selectedProfile.companyName} />
                  <InfoItem label="Owner Name" value={selectedProfile.ownerName} />
                  <InfoItem label="National Approval ID" value={selectedProfile.nationalApprovalId} />
                  <InfoItem label="Owner National ID" value={selectedProfile.ownerNationalId} />
                </div>
              </div>

              {/* Status and Contact */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold dark:text-white border-b pb-2">Status & Contact</h3>
                <div className="space-y-2">
                <InfoItem label="Added in" value={selectedProfile.submitDate.toLocaleDateString()} />
                  <InfoItem label="Phone Number" value={selectedProfile.phoneNumber} />
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
                    label="Ownership Document"
                    url={selectedProfile.ownershipDocumentFileUrl}
                  />
                  <DocumentLink 
                    label="National Approval"
                    url={selectedProfile.ownerNationalApprovalFileUrl}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-3 bg-white dark:bg-dark-2 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold dark:text-white mb-4">Location</h3>
            <div className="h-[500px] w-full">
              <MapContainer 
                center={[selectedProfile.latitude, selectedProfile.longitude]} 
                zoom={9} 
                style={{ height: "100%", width: "100%" }}
                className='z-0 rounded-lg'
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[selectedProfile.latitude, selectedProfile.longitude]}>
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-semibold mb-2">{selectedProfile.locationName}</h4>
                      <InfoItem label="Building Type" value={selectedProfile.buildingType} />
                      <InfoItem label="Building Number" value={selectedProfile.buildingNumber} />
                      <InfoItem label="Floor" value={selectedProfile.floorNumber} />
                      <InfoItem label="Apartment" value={selectedProfile.apartmentNumber} />
                      <InfoItem label="Street" value={selectedProfile.streetNumber} />
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          {isAcceptModalOpen && (
          <ReviewProfileModal 
            onConfirm={(description) => {
              // Handle the review description
              console.log(description);
              closeAcceptModal();
            }}
            onCancel={closeAcceptModal}
          />
        )}
        {isRejectModalOpen && (
          <ReviewProfileModal 
            onConfirm={(description) => {
              // Handle the review description
              console.log(description);
              closeRejectModal();
            }}
            onCancel={closeRejectModal}
          />
        )}
        </div>
      )}
      
    </div>
  )
}

// Helper Components
const InfoItem = ({ label, value }: { label: string, value: string | undefined | null}) => (
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


export default Profiles
