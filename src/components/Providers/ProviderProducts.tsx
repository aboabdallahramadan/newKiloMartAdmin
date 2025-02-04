"use client"
import React, { useEffect, useState } from 'react';
import { ProductOffer } from '@/types/productOffer';
import ProductCard from './ProductCard';
import ElementLoader from '../common/ElementLoader';
import { useParams } from 'next/dist/client/components/navigation';
import ClickOutside from '../ClickOutside';

const ProviderProducts = () => {
  const [products, setProducts] = useState<ProductOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductOffer | null>(null);
  const {id} = useParams();
  const [isOpen, setIsOpen] = useState(false);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/backend/api/admin-panel/products-for-provider?language=${language}&providerId=${id}&pageNumber=${currentPage}&pageSize=${pageSize}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (data.status) {
          setProducts(data.data.products);
          setTotalCount(data.data.totalCount);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize, language]);

  const handleOptionSelect = (option: number) => {
    setLanguage(option);
    setIsOpen(false);
  };

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

  const handleShowDetails = (product: ProductOffer) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="rounded-xl bg-gray-50 dark:bg-gray-dark p-6 shadow-md">
      <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
        <h2 className="text-2xl font-bold text-dark dark:text-white">Provider&lsquo;s Products</h2>
        
        <ClickOutside onClick={() => setIsOpen(false)}>
          <div className="relative z-999">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-dark dark:text-white">Language</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={() => handleOptionSelect(2)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  English
                </button>
                <button
                  onClick={() => handleOptionSelect(1)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Arabic
                </button>
              </div>
            )}
          </div>
        </ClickOutside>
      </div>

      {loading ? (
        <ElementLoader />
      ) : (
        <>
        {
          products.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-800 text-center">no products found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                  {products.map((product) => (
                    <ProductCard key={product.productId} product={product} onShowDetails={handleShowDetails} />
                  ))}
                </div>
              )
        }
          

          <div className="flex items-center justify-between">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1} 
              className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors duration-300"
            >
              Previous
            </button>
            <span className="text-dark dark:text-white font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages} 
              className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
      

      {selectedProduct && (
  <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center p-4">
    <ClickOutside onClick={handleCloseModal}>
      <div className="bg-white dark:bg-gray-dark rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 dark:border-dark-3">
          <h3 className="text-2xl font-bold text-dark dark:text-white">{selectedProduct.productName}</h3>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${selectedProduct.productImageUrl}`} 
              alt={selectedProduct.productName} 
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />
            
            <div className="w-full md:w-1/2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">{selectedProduct.productOfferPrice} SAR</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                  <p className="text-lg font-semibold text-dark dark:text-white">{selectedProduct.productOfferQuantity} {selectedProduct.productMeasurementUnit}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="text-lg font-semibold text-dark dark:text-white">{selectedProduct.productCategoryName}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Discount</p>
                  <p className="text-lg font-semibold text-primary">{selectedProduct.productOfferOffPercentage}%</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
                <p className="text-dark dark:text-white">{selectedProduct.productDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-dark-3 flex justify-end">
          <button 
            onClick={handleCloseModal} 
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </ClickOutside>
  </div>
)}

    </div>
  );
};

export default ProviderProducts;