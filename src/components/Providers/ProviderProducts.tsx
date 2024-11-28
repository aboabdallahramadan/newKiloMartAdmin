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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductOffer | null>(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product-offer/list?provider=${id}&language=2&page=${currentPage}&pageSize=${pageSize}`, {
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
  }, [currentPage, pageSize]);

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
      <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Provider's Products</h2>
      {loading ? (
        <ElementLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} onShowDetails={handleShowDetails} />
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Next
        </button>
      </div>

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