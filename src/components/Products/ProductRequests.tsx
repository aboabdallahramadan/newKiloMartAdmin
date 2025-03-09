"use client";
import React, { useEffect, useState } from 'react';
import { ProductRequest } from '@/types/productRequest';
import { FaTrash, FaCheck, FaBan } from "react-icons/fa";
import ClickOutside from '@/components/ClickOutside';
import { Category } from '@/types/category';
import ElementLoader from '../common/ElementLoader';
import { toast } from 'react-toastify';

const ProductRequests = () => {
  const [language, setLanguage] = useState(2);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState<ProductRequest[]>([]);
  const pageSize = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/backend/api/admin-panel/product-requests?pageNumber=${currentPage}&pageSize=${pageSize}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.productRequests);
        setTotalCount(data.totalCount);
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleLanguageSelect = (option: number) => {
    setLanguage(option);
    setCurrentPage(1);
    setIsLanguageOpen(false);
  };

  const handleDelete = async (requestId: number) => {
    if (!window.confirm("Are you sure you want to delete this product request?")) return;
    try {
      const response = await fetch(`/backend/api/admin-panel/product-requests/delete?requestId=${requestId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted product request from state
        setProducts(products.filter((product) => product.productRequestId !== requestId));
        toast.success("Product request deleted successfully!");
      } else {
        console.error("Failed to delete product request:", response.statusText);
        toast.error("Failed to delete product request!");
      }
    } catch (error) {
      console.error("An error occurred while deleting the product request:", error);
      toast.error("An error occurred while deleting the product request.");
    }
  };

  // Helper function for updating product request status.
  const handleReject = async (requestId: number) => {
    try {
      const response = await fetch(`/backend/api/admin-panel/product-requests/reject?requestId=${requestId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        // Update that product's status in state.
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.productRequestId === requestId ? { ...product, status: 3 } : product
          )
        );
        toast.success(`Product request rejected successfully!`);
      } else {
        console.error(`Failed to update product request status:`, response.statusText);
        toast.error(`Failed to reject product request!`);
      }
    } catch (error) {
      console.error("An error occurred while updating status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  const handleActivate = async (requestId: number) => {
    try {
      const response = await fetch(`/backend/api/provider/product-request/accept?id=${requestId}`, {
        method: 'POST',
      });
      if (response.ok) {
        // Update that product's status in state.
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.productRequestId === requestId ? { ...product, status: 2 } : product
          )
        );
        toast.success(`Product request accepted successfully!`);
      } else {
        console.error(`Failed to update product request status:`, response.statusText);
        console.log(response);
        toast.error(`Failed to accept product request!`);
      }
    } catch (error) {
      console.error("An error occurred while updating status:", error);
      toast.error("An error occurred while updating status.");
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9 flex items-center justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Active Products
        </h4>
        {/* Language selector markup if needed */}
      </div>
      {loading ? (
        <>
          <ElementLoader />
        </>
      ) : (
        products.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-3 md:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Product Name</p>
              </div>
              <div className="col-span-3 hidden items-center md:flex">
                <p className="font-medium">Description</p>
              </div>
              <div className="col-span-1 hidden items-center md:flex">
                <p className="font-medium">Measurement</p>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <p className="font-medium">Actions</p>
              </div>
            </div>

            {products.map((product, key) => (
              <div
                className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-3 md:grid-cols-7 md:px-6 2xl:px-7.5"
                key={key}
              >
                <div className="col-span-2 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${product.imageUrl}`}
                        width={60}
                        height={50}
                        alt="Product"
                      />
                    </div>
                    <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                      {product.localizedName}
                    </p>
                  </div>
                </div>
                <div className="col-span-3 hidden items-center md:flex">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {product.description}
                  </p>
                </div>
                <div className="col-span-1 hidden items-center md:flex">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {product.measurementUnit}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-end space-x-1.5 sm:space-x-3.5">
                  {product.status === 2 ? (
                    <button 
                      className="ml-2 hover:text-primary" 
                      title='Deactivate'
                      onClick={() => handleReject(product.productRequestId)}
                    >
                      <FaBan />
                    </button>
                  ): product.status === 1 && (
                    <>
                      <button 
                        className="ml-2 hover:text-primary" 
                        title='Activate'
                        onClick={() => handleActivate(product.productRequestId)}
                      >
                        <FaCheck />
                      </button>
                      <button 
                        className="ml-2 hover:text-primary" 
                        title='Deactivate'
                        onClick={() => handleReject(product.productRequestId)}
                      >
                        <FaBan />
                      </button>
                    </>
                  )}
                  <button 
                    className="ml-2 hover:text-red-500" 
                    title='Delete'
                    onClick={() => handleDelete(product.productRequestId)}
                  >
                    <FaTrash />
                  </button>
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
          <p className="px-4 py-4.5"> no products found</p>
        )
      )}
    </div>
  );
};

export default ProductRequests;
