"use client";
import React, { useState } from 'react'
import ClickOutside from '../ClickOutside';
import ButtonDefault from '../Buttons/ButtonDefault';
import InputGroup from '../FormElements/InputGroup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ElementLoader from '../common/ElementLoader';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
// Fix leaflet's default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: '',
  iconSize: [16, 20],
  iconAnchor: [8, 16]
});


interface FormDataType {
    [key: string]: string | number | File | null;
}

interface LocationPickerProps {
  onLocationSelect: (latlng: { lat: number, lng: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    }
  });
  return position ? <Marker position={position} /> : null;
};


const AddNewProvider = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        Email: '',
        DisplayName: '',
        Password: '',
        Language: 1,
        FirstName: '',
        SecondName: '',
        NationalApprovalId: '',
        CompanyName: '',
        OwnerName: '',
        OwnerNationalId: '',
        LocationName: '',
        Longitude: 0,
        Latitude: 0,
        BuildingType: '',
        BuildingNumber: '',
        FloorNumber: '',
        ApartmentNumber: '',
        StreetNumber: '',
        PhoneNumber: '',
        OwnershipDocumentFile: null,
        OwnerNationalApprovalFile: null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file' && files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // New handler for location selection on the map
    const handleLocationSelect = (latlng: { lat: number; lng: number }) => {
        setFormData(prev => ({
            ...prev,
            Latitude: latlng.lat,
            Longitude: latlng.lng
        }));
    };

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'OwnershipDocumentFile' || key === 'OwnerNationalApprovalFile') {
                if (value && value instanceof File) {
                    formDataToSend.append(key, value as File);
                }
            } else if (value !== null) {
                formDataToSend.append(key, String(value));
            }
        });
    
        try {
            setIsLoading(true);
            const response = await fetch('/backend/api/admin-panel/create-provider-directly', {
                method: 'POST',
                body: formDataToSend,
            });
            
            if (response.ok) {
                toast.success('Provider added successfully!');
                handleCloseModal();
            }
            else {
                console.log('Response errors:', response.json());
                toast.error('Failed to add provider. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to add provider. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <ButtonDefault
                label="Add New Provider"
                link="#"
                customClasses="bg-dark rounded-full text-white py-[11px] px-6"
                click={handleOpenModal}
            >
                <FaPlus />
            </ButtonDefault>

            {isModalOpen && (
                <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
                    <ClickOutside onClick={handleCloseModal}>
                        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-semibold text-dark dark:text-white">Add New Provider</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5 grid grid-cols-2 gap-4">
                                    <InputGroup
                                        label="Phone number must start with +966"
                                        type="text"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleInputChange}
                                        required
                                        pattern="^\+966.*$"
                                    />
                                    <InputGroup
                                        label="Display Name"
                                        type="text"
                                        name="DisplayName"
                                        value={formData.DisplayName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Password"
                                        type="password"
                                        name="Password"
                                        value={formData.Password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="First Name"
                                        type="text"
                                        name="FirstName"
                                        value={formData.FirstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Second Name"
                                        type="text"
                                        name="SecondName"
                                        value={formData.SecondName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Company Name"
                                        type="text"
                                        name="CompanyName"
                                        value={formData.CompanyName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Owner Name"
                                        type="text"
                                        name="OwnerName"
                                        value={formData.OwnerName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="National Approval Id"
                                        type="text"
                                        name="NationalApprovalId"
                                        value={formData.NationalApprovalId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Owner National Id"
                                        type="text"
                                        name="OwnerNationalId"
                                        value={formData.OwnerNationalId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Location Name"
                                        type="text"
                                        name="LocationName"
                                        value={formData.LocationName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                                            Select Location on Map
                                        </label>
                                        <MapContainer 
                                            center={{ lat: 24.181212251491353, lng: 43.91654599169042 }} zoom={6}
                                            style={{ height: '300px', width: '100%' }}
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <LocationPicker onLocationSelect={handleLocationSelect} />
                                        </MapContainer>
                                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                          Click on the map to select a location.
                                        </p>
                                    </div>
                                    <InputGroup
                                        label="Building Type"
                                        type="text"
                                        name="BuildingType"
                                        value={formData.BuildingType}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Building Number"
                                        type="text"
                                        name="BuildingNumber"
                                        value={formData.BuildingNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Floor Number"
                                        type="text"
                                        name="FloorNumber"
                                        value={formData.FloorNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Apartment Number"
                                        type="text"
                                        name="ApartmentNumber"
                                        value={formData.ApartmentNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Street Number"
                                        type="text"
                                        name="StreetNumber"
                                        value={formData.StreetNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Phone Number"
                                        type="text"
                                        name="PhoneNumber"
                                        value={formData.PhoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        pattern="^\+966.*$"
                                    />
                                    <InputGroup
                                        label="Ownership Documents"
                                        type="file"
                                        name="OwnershipDocumentFile"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="National Approval"
                                        type="file"
                                        name="OwnerNationalApprovalFile"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    
                                    <div className='col-span-2 grid gap-2 grid-cols-3 mt-4'>
                                        <button type="submit" className="col-span-2 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                                            {
                                                isLoading ? (
                                                    <ElementLoader size={8} color='white'/>
                                                ) : (
                                                    <>
                                                    Add Provider
                                                    </>
                                                )
                                            }
                                            
                                        </button>
                                        <button type="button" onClick={handleCloseModal} className="col-span-1 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ClickOutside>
                </div>
            )}
        </>
    );
}

export default AddNewProvider;
