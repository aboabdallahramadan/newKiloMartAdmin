"use client";
import React, { useState } from 'react'
import ClickOutside from '../ClickOutside';
import InputGroup from '../FormElements/InputGroup';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FreeDelivery } from '@/types/freeDelivery';
import ElementLoader from '../common/ElementLoader';

interface EditFreeDeliveryProps {
    setFreeDeliveryOffersData: React.Dispatch<React.SetStateAction<any>>;
    freeDelivery: FreeDelivery;
}

const EditFreeDelivery: React.FC<EditFreeDeliveryProps> = ({setFreeDeliveryOffersData , freeDelivery}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Omit<FreeDelivery, "id">>({
        startDate: freeDelivery.startDate,
        endDate: freeDelivery.endDate,
        isActive: freeDelivery.isActive,
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            setIsSubmitting(true);
            const response = await fetch(`/backend/api/driverfreefee/admin/edit/${freeDelivery.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                toast.success('Discount freeDelivery created successfully!');
                setFreeDeliveryOffersData((prevFreeDeliveryOffersData: any[]) =>
                    prevFreeDeliveryOffersData.map((offer) =>
                        offer.id === freeDelivery.id ? { 
                            ...offer,
                            startDate: formData.startDate,
                            endDate: formData.endDate
                         } : offer
                ));
                handleCloseModal();
            } else {
                console.log('Error:', response.json());
                throw new Error('Failed to create discount freeDelivery');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create discount freeDelivery');
        } finally {
            setIsSubmitting(false);
        }
        
        handleCloseModal();
    };
    
    return (
        <>
        <button className="hover:text-primary" title="Freeze" onClick={() =>handleOpenModal()}>
        <FaEdit/>
        </button>
        {isModalOpen && (
            <div className="fixed top-0 left-[-40px] inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
                <ClickOutside onClick={handleCloseModal}>
                    <div className="w-full max-w-lg rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card max-h-screen overflow-y-auto">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                            <h3 className="font-semibold text-dark dark:text-white">
                                Add New Free Delivery Offer
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <InputGroup
                                    label="Start Date"
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    placeholder='Enter start date'
                                    customClasses="mb-4.5"
                                />

                                <InputGroup
                                    label="End Date"
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    placeholder='Enter end date'
                                    customClasses="mb-4.5"
                                />

                                <div className='grid gap-2 grid-cols-3'>
                                    <button 
                                        onClick={handleSubmit} 
                                        type="submit"
                                        className="col-span-2 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                                    >
                                        {
                                            isSubmitting ? (
                                                <ElementLoader color='white' />
                                            ) : (
                                                <span>Save Offer</span>
                                            )
                                        }
                                        
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="col-span-1 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300"
                                    >
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

export default EditFreeDelivery;
