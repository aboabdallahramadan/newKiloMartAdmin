"use client";
import React, {useState, useEffect} from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProductOffer as Details } from '@/types/productOffer';
import ElementLoader from '../common/ElementLoader';


const ProductOfferDetails = ({ }) => {
    const [product, setProduct] = useState<Details | null>(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/backend/api/admin-panel/offers-details-by-id?languageId=2&offerId=${id}`);
                if(response.ok)
                {
                    const data = await response.json();
                    setProduct(data);
                }
                else {
                    console.log(response)
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            };
        };
        fetchProduct();
    }, []);
    return (
        <div className="bg-white dark:bg-gray-dark p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            {
                loading ? (
                    <ElementLoader /> 
                ) : product ? (
                    <div className="flex flex-col gap-8">
                        {/* Image and Basic Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <img 
                                src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${product.productImageUrl}`} 
                                alt={product.productName} 
                                className="w-full h-[400px] object-cover rounded-lg shadow-sm"
                            />
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-dark dark:text-white">{product.productName}</h2>
                                    <span className={`px-3 py-1 rounded-full text-sm ${product.productIsActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {product.productIsActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-body-sm text-dark dark:text-dark-6">{product.productDescription}</p>
                                
                                {/* Offer Details */}
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3">Offer Details</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Price:</span>
                                            <span className="font-semibold">{product.productOfferPrice} SAR</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Discount:</span>
                                            <span className="font-semibold text-green-600">{product.productOfferOffPercentage}% OFF</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Start Date:</span>
                                            <span className="font-semibold">{new Date(product.productOfferFromDate).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        {/* Detailed Information Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Measurement Unit</p>
                                <p className="text-lg font-semibold">{product.productMeasurementUnit}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="text-lg font-semibold">{product.productCategoryName}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Available Quantity</p>
                                <p className="text-lg font-semibold">{product.productOfferQuantity} {product.productMeasurementUnit}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Provider</p>
                                <Link href={`/providers/${product.productOfferProvider}`} className="text-blue-500 hover:underline">
                                    <p className="text-lg font-semibold">{product.partyDisplayName}</p>
                                </Link>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Product Status</p>
                                <p className={`text-lg font-semibold ${product.productOfferIsActive ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.productOfferIsActive ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>no details found</p>
                )
            }

        </div>
    );
};

export default ProductOfferDetails;
