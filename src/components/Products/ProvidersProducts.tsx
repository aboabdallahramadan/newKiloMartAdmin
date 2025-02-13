"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ClickOutside from '@/components/ClickOutside';
import ElementLoader from '../common/ElementLoader';
import { ProductOffer } from '@/types/productOffer';


const ProvidersProducts = () => {
  const [language, setLanguage] = useState(2);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState<ProductOffer[]>([]);
  
  const pageSize = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/backend/api/admin-panel/get-all-productOffers-paginated?pageNumber=${currentPage}&pageSize=${pageSize}&languageId=${language}`);
      const data = await response.json();
      if (response.ok) {
          setProducts(data.offers);
          setTotalCount(data.count);
      } else {
          console.error("Failed to fetch products:", data);
      }
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
      fetchProducts();
  }, [currentPage, language]);


  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
      }
  };

  const handlePreviousPage = () => {
      if (currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
      }
  };



  const handleLanguageSelect = (option: number) => {
    setLanguage(option);
    setCurrentPage(1);
    setIsLanguageOpen(false);
  };
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9 flex items-center justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Active Products
        </h4>
        <div className='flex items-center gap-2'>
          <ClickOutside onClick={() => setIsLanguageOpen(false)}>
            <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
                <div
                className={`py-[5px] pl-[9px] pr-[35px] text-xs sm:text-sm font-medium text-dark dark:text-white ${isLanguageOpen ? "open" : ""}`}
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                Language
                <span
                    className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isLanguageOpen && "rotate-180"}`}
                >
                    <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.32293 6.38394C3.5251 6.14807 3.88021 6.12075 4.11608 6.32293L9.00001 10.5092L13.8839 6.32293C14.1198 6.12075 14.4749 6.14807 14.6771 6.38394C14.8793 6.61981 14.8519 6.97492 14.6161 7.17709L9.36608 11.6771C9.15543 11.8576 8.84459 11.8576 8.63394 11.6771L3.38394 7.17709C3.14807 6.97492 3.12075 6.61981 3.32293 6.38394Z"
                        fill=""
                    />
                    </svg>
                </span>
                </div>
                {isLanguageOpen && (
                <div className="absolute right-0 top-full z-40 mt-2 w-full rounded-[7px] border border-stroke bg-white py-1.5 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
                    <ul>
                        <li
                        onClick={() => handleLanguageSelect(2)}
                        className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 2 ? "selected" : ""}`}
                        >
                        English
                        </li>
                        <li
                        onClick={() => handleLanguageSelect(1)}
                        className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 1 ? "selected" : ""}`}
                        >
                        Arabic
                        </li>
                    </ul>
                </div>
                )}
            </div>
          </ClickOutside>
        </div>
      </div>
      {
        loading ? (
          <>
            <ElementLoader />
          </>
        ) : ( products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-5 gap-2 md:gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:grid-cols-6 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center justify-start">
                <p className="font-medium">Product</p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium">Provider</p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium">Price</p>
              </div>
              <div className="col-span-1 hidden sm:flex items-center justify-center">
                <p className="font-medium">Quantity</p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <p className="font-medium">Total Orders</p>
              </div>
            </div>

            {products.map((product, key) => (
              <div
                className="grid grid-cols-5 gap-2 sm:gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:grid-cols-6 md:px-6 2xl:px-7.5"
                key={key}
              >
                <div className="col-span-2 flex items-center justify-start">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${product.productImageUrl}`}
                        width={60}
                        height={50}
                        alt="Product"
                      />
                    </div>
                    <p className="text-body-sm font-medium">
                        <Link href={`/products/providers-products/${product.id}`} className='text-blue-500 hover:text-blue-700'>
                            {product.productName}
                        </Link>
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    <Link href={`/providers/${product.providerId}`} className='text-blue-500 hover:text-blue-700'>
                        {product.providerDisplayName}
                    </Link>
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {product.price}SAR
                    
                  </p>
                </div>
                <div className="col-span-1 hidden sm:flex items-center justify-center">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {product.quantity}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {product.totalOrders}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4 px-4 py-4.5">
              <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-primary text-white disabled:bg-gray-300 rounded disabled:opacity-50">
                Previous
              </button>
              <span className="flex items-center">Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-primary text-white disabled:bg-gray-300 rounded disabled:opacity-50">
                Next
              </button>
            </div>
          </>
        ) : (
          <p className='px-4 py-4.5'> no products found</p>
        )
      )
      }
      
    </div>
  )
}

export default ProvidersProducts