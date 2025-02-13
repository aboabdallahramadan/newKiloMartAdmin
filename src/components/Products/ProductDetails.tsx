"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProductDetails as Details } from '@/types/productDetails';
import ElementLoader from '../common/ElementLoader';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Details | null>(null);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) {
      setError('Product id is missing');
      return;
    }
    const fetchProduct = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(
          `/backend/api/admin-panel/product-details-by-id?productId=${id}&language=2`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data.productDetail);
        setTotalOrders(data.orderCount);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <ElementLoader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-dark p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Image Section */}
        <div>
          <img 
            src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${product.productImageUrl}`} 
            alt={product.productName} 
            className="w-full h-[400px] object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              {product.productName}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm ${product.productIsActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {product.productIsActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          <p className="text-body-sm text-dark dark:text-dark-6 leading-relaxed">
            {product.productDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Measurement Unit</p>
              <p className="text-lg font-semibold text-dark dark:text-white">
                {product.productMeasurementUnit}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="text-lg font-semibold text-dark dark:text-white">
                {product.productCategoryName}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-lg font-semibold text-dark dark:text-white">
                {totalOrders}
              </p>
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
