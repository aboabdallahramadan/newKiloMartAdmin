"use client";
import React, { useState } from 'react'
import ClickOutside from '../ClickOutside';
import ButtonDefault from '../Buttons/ButtonDefault';
import InputGroup from '../FormElements/InputGroup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ElementLoader from '../common/ElementLoader';

interface FormDataType {
    [key: string]: string | number | File | null;
}

const AddNewDelivery = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        Email: '',
        DisplayName: '',
        Password: '',
        Language: 1,
        FirstName: '',
        SecondName: '',
        NationalName: '',
        NationalId: '',
        LicenseNumber: '',
        LicenseExpiredDate: '',
        DrivingLicenseNumber: '',
        DrivingLicenseExpiredDate: '',
        VehicleNumber: '',
        VehicleModel: '',
        VehicleType: '',
        VehicleYear: 2020,
        VehiclePhotoFile: null,
        DrivingLicenseFile: null,
        VehicleLicenseFile: null,
        NationalIqamaIDFile: null
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (
                key === 'VehiclePhotoFile' || 
                key === 'DrivingLicenseFile' || 
                key === 'VehicleLicenseFile' || 
                key === 'NationalIqamaIDFile'
            ) {
                if (value && value instanceof File) {
                    formDataToSend.append(key, value as File);
                }
            } else if (value !== null) {
                formDataToSend.append(key, String(value));
            }
        });
    
        try {
            setIsLoading(true);
            const response = await fetch('/backend/api/admin-panel/create-delivery-directly', {
                method: 'POST',
                body: formDataToSend,
            });
            
            if (response.ok) {
                toast.success('Delivery added successfully!');
                handleCloseModal();
            }
            else {
                console.log('Response errors:', response.json());
                toast.error('Failed to add delivery. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to add delivery. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <ButtonDefault
                label="Add New Delivery"
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
                                <h3 className="font-semibold text-dark dark:text-white">Add New Delivery</h3>
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
                                        label="National Name"
                                        type="text"
                                        name="NationalName"
                                        value={formData.NationalName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="National Id"
                                        type="text"
                                        name="NationalId"
                                        value={formData.NationalId}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="License Number"
                                        type="text"
                                        name="LicenseNumber"
                                        value={formData.LicenseNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="License Expired Date"
                                        type="date"
                                        name="LicenseExpiredDate"
                                        value={formData.LicenseExpiredDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Driving License Number"
                                        type="text"
                                        name="DrivingLicenseNumber"
                                        value={formData.DrivingLicenseNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Driving License Expired Date"
                                        type="date"
                                        name="DrivingLicenseExpiredDate"
                                        value={formData.DrivingLicenseExpiredDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Vehicle Number"
                                        type="text"
                                        name="VehicleNumber"
                                        value={formData.VehicleNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Vehicle Model"
                                        type="text"
                                        name="VehicleModel"
                                        value={formData.VehicleModel}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Vehicle Type"
                                        type="text"
                                        name="VehicleType"
                                        value={formData.VehicleType}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Vehicle Year"
                                        type="number"
                                        name="VehicleYear"
                                        value={formData.VehicleYear}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <InputGroup
                                        label="Vehicle Photo"
                                        type="file"
                                        name="VehiclePhotoFile"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Driving License File"
                                        type="file"
                                        name="DrivingLicenseFile"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="Vehicle License File"
                                        type="file"
                                        name="VehicleLicenseFile"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <InputGroup
                                        label="National Iqama ID File"
                                        type="file"
                                        name="NationalIqamaIDFile"
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
                                                    Add Delivery
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

export default AddNewDelivery;
