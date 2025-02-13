"use client";
import React, { useState, useEffect } from 'react'
import ClickOutside from '../ClickOutside';
import ButtonDefault from '../Buttons/ButtonDefault';
import InputGroup from '../FormElements/InputGroup';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Offer } from '@/types/offer';
import { Product } from '@/types/product';

interface AddNewOfferProps {
    setOffersData: React.Dispatch<React.SetStateAction<any>>;
    fetchOffers: () => Promise<void>;
}

const AddNewOffer: React.FC<AddNewOfferProps> = ({setOffersData , fetchOffers}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>()
    const fetchProducts = async () => {
        try {
          const response = await fetch(`/backend/api/products/list/paginated-with-filters?language=2&productIsActive=true&pageNumber=1&pageSize=999999`);
          const data = await response.json();
          if (data.status) {
              setProducts(data.data.items);
          } else {
              console.error("Failed to fetch products:", data.message);
          }
        } catch (error) {
          console.error("An error occurred while fetching products:", error);
        } finally {
        }
      };
      useEffect(() => {
          fetchProducts();
      }, []);
    const [formData, setFormData] = useState<Omit<Offer , "productName" | "productImageUrl" | "id">>({
        product: 0,
        offPercentage: 0,
        startDate: '',
        endDate: '',
        isActive: true,
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
            const response = await fetch(`/backend/api/deal/admin/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                toast.success('Discount offer created successfully!');
                setOffersData((prevOffersData: any) => [...prevOffersData, data.data]);
                fetchOffers();
                handleCloseModal();
            } else {
                console.log(response.json())
                throw new Error('Failed to create discount offer');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create discount offer');
        }
        
        handleCloseModal();
    };
    
    return (
        <>
        <ButtonDefault
            label="Add New offer"
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
                                Add New Discount Offer
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Product
                                    </label>
                                    <select
                                        name="product"
                                        value={formData.product}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-dark-3"
                                    >
                                        {products && products.map((product) => (
                                            <option key={product.productId} value={product.productId}>
                                                {product.productName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <InputGroup
                                    label="Value"
                                    type="number"
                                    name="offPercentage"
                                    placeholder="Enter discount value"
                                    value={formData.offPercentage}
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
                                        Add Discount offer
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

export default AddNewOffer;
