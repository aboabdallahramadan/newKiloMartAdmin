"use client";
import React, { useState } from 'react';
import ClickOutside from '@/components/ClickOutside';
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import InputGroup from '@/components/FormElements/InputGroup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddNewCategory = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [arabicName, setArabicName] = useState('');
    const [englishName, setEnglishName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setArabicName('');
        setEnglishName('');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const categoryData = {
            arabic: { name: arabicName },
            endlish: { name: englishName },
        };

        try {
            const response = await fetch(`/backend/api/admin/product-categories/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set Content-Type to application/json
                },
                body: JSON.stringify(categoryData), // Convert the object to a JSON string
            });
            const data = await response.json();

            if (data.status) {
                toast.success('Category added successfully!', {
                    autoClose: 3000,
                });
                handleCloseModal();
                router.refresh();
            } else {
                toast.error(data.message || 'Failed to add category.', {
                    autoClose: 3000,
                });
                console.log(data.message);
            }
        } catch (err) {
            toast.error('An error occurred while adding the category.', {
                autoClose: 3000,
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ButtonDefault
                label="Add New Category"
                link="#"
                customClasses="bg-dark rounded-full text-white py-[11px] px-6"
                click={() => handleOpenModal()}
            >
                <FaPlus />
            </ButtonDefault>

            {isModalOpen && (
                <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
                    <ClickOutside onClick={handleCloseModal}>
                        <div className="w-full rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                                <h3 className="font-semibold text-dark dark:text-white">
                                    Add New Category
                                </h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    <InputGroup
                                        label="Category Name (Arabic)"
                                        type="text"
                                        placeholder="Enter category name in Arabic"
                                        customClasses="mb-4.5"
                                        value={arabicName}
                                        onChange={(e) => setArabicName(e.target.value)}
                                    />
                                    <InputGroup
                                        label="Category Name (English)"
                                        type="text"
                                        placeholder="Enter category name in English"
                                        customClasses="mb-4.5"
                                        value={englishName}
                                        onChange={(e) => setEnglishName(e.target.value)}
                                    />
                                    <div className='grid gap-2 grid-cols-3'>
                                        <button 
                                            type="submit" 
                                            className={`col-span-2 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={loading}
                                        >
                                            {loading ? 'Adding...' : 'Add Category'}
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
};

export default AddNewCategory;