"use client";
import React, { useState } from 'react'
import ClickOutside from '../ClickOutside';
import ButtonDefault from '../Buttons/ButtonDefault';
import InputGroup from '../FormElements/InputGroup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ElementLoader from '../common/ElementLoader';

interface AddNewCodeProps {
    setCodesData: React.Dispatch<React.SetStateAction<any>>;
}

const AddNewCode: React.FC<AddNewCodeProps> = ({setCodesData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 1,
        value: 0,
        description: '',
        startDate: '',
        endDate: ''
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
        console.log('Form Data:', formData);
    
        try {
            setIsSubmitting(true);
            const response = await fetch(`/backend/api/admin/discountcode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Discount code created successfully!');
                setCodesData((prevCodesData: any) => [...prevCodesData, data.data]);
                handleCloseModal();
            } else {
                console.error('Failed to create discount code', data);
                throw new Error('Failed to create discount code');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create discount code');
        } finally {
            setIsSubmitting(false);
        }
        
        handleCloseModal();
    };
    
    return (
        <>
        <ButtonDefault
            label="Add New Code"
            link="#"
            customClasses="bg-dark rounded-full text-white py-[11px] px-6"
            click={handleOpenModal}
        >
            <FaPlus />
        </ButtonDefault>

        {isModalOpen && (
            <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
                <ClickOutside onClick={handleCloseModal}>
                    <div className="w-full max-w-lg rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card max-h-screen overflow-y-auto">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                            <h3 className="font-semibold text-dark dark:text-white">
                                Add New Discount Code
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <InputGroup
                                    label="Code"
                                    type="text"
                                    name="code"
                                    placeholder="Enter discount code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    customClasses="mb-4.5"
                                />

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Discount Type
                                    </label>
                                    <select
                                        name="discountType"
                                        value={formData.discountType}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-dark-3"
                                    >
                                        <option value="1" selected>Fixed Amount</option>
                                        <option value="2">Percentage</option>
                                    </select>
                                </div>

                                <InputGroup
                                    label="Value"
                                    type="number"
                                    name="value"
                                    placeholder="Enter discount value"
                                    value={formData.value}
                                    onChange={handleChange}
                                    customClasses="mb-4.5"
                                />

                                <InputGroup
                                    label="Description"
                                    type="text"
                                    name="description"
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    customClasses="mb-4.5"
                                />

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
                                            ) :(
                                                <span>Add Discount Code</span>
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

export default AddNewCode;
