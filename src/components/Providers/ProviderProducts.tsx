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
  const [pageSize] = useState(3);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductOffer | null>(null);
  const {id} = useParams();
  const [isOpen, setIsOpen] = useState(false);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product-offer/list?provider=${id}&language=${language}&page=${currentPage}&pageSize=${pageSize}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (data.status) {
          setProducts(data.data.data);
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
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className='flex justify-between items-center w-full'>
        <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider's Products</h2>
        <ClickOutside onClick={() => setIsOpen(false)}>
          <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
            <div
              className={`py-[5px] pl-[9px] pr-[35px] text-sm font-medium text-dark dark:text-white ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Language
              <span
                className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isOpen && "rotate-180"}`}
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
            {isOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 w-full rounded-[7px] border border-stroke bg-white py-1.5 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
                <ul>
                    <li
                      onClick={() => handleOptionSelect(2)}
                      className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 2 ? "selected" : ""}`}
                    >
                      English
                    </li>
                    <li
                      onClick={() => handleOptionSelect(1)}
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
      {loading ? (
        <ElementLoader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} onShowDetails={handleShowDetails} />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-primary text-white disabled:bg-gray-300 rounded disabled:opacity-50">
              Previous
            </button>
            <span className="flex items-center">Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-primary text-white disabled:bg-gray-300 rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}
      

      {selectedProduct && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
            <ClickOutside onClick={() => handleCloseModal()}>
            <div className="bg-white dark:bg-gray-dark p-6 rounded shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">{selectedProduct.productName}</h3>
              <img src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${selectedProduct.productImageUrl}`} alt={selectedProduct.productName} className="w-full h-48 object-cover rounded mb-4" />
              <div className="space-y-2">
                <p><strong>Description:</strong> {selectedProduct.productDescription}</p>
                <p><strong>Price:</strong> {selectedProduct.productOfferPrice} RS</p>
                <p><strong>Quantity:</strong> {selectedProduct.productOfferQuantity}</p>
                <p><strong>Category:</strong> {selectedProduct.productCategoryName}</p>
                <p><strong>Measurement Unit:</strong> {selectedProduct.productMeasurementUnit}</p>
                <p><strong>Offer From Date:</strong> {new Date(selectedProduct.productOfferFromDate).toLocaleDateString()}</p>
                <p><strong>Offer Off Percentage:</strong> {selectedProduct.productOfferOffPercentage}%</p>
              </div>
              <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Close
              </button>
            </div>
          </ClickOutside>
        </div>
      )}
    </div>
  );
};

export default ProviderProducts;