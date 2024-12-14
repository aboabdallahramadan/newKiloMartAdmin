"use client";
import React from 'react';
import { ProductDetails as Details } from '@/types/productDetails';

const product : Details = {
    id: 1,
    name: "Potato",
    description: "High-quality long grain basmati rice, perfect for biryani and pulao. Sourced from the finest rice fields with natural aging process.",
    imageUrl: "images/559d17ec-d21b-4168-a0bf-f3caffa2869b.jpg",
    measurementUnit: "KG",
    categoryName: "Grains & Rice",
    totalOrders: 1250,
    minPrice: 89.99,
    maxPrice: 129.99,
    isActive: true,
    categoryId: 3
};

const ProductDetails = ({ }) => {
    return (
        <div className="bg-white dark:bg-gray-dark p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <img 
                        src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${product.imageUrl}`} 
                        alt={product.name} 
                        className="w-full h-[400px] object-cover rounded-lg shadow-sm"
                    />
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-dark dark:text-white">{product.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm ${product.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <p className="text-body-sm text-dark dark:text-dark-6 leading-relaxed">{product.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Measurement Unit</p>
                            <p className="text-lg font-semibold text-dark dark:text-white">{product.measurementUnit}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                            <p className="text-lg font-semibold text-dark dark:text-white">{product.categoryName}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                            <p className="text-lg font-semibold text-dark dark:text-white">{product.totalOrders}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Price Range</p>
                            <p className="text-lg font-semibold text-dark dark:text-white">
                                {product.minPrice} - {product.maxPrice} RS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
