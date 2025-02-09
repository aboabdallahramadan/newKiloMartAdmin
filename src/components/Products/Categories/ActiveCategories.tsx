"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ElementLoader from '@/components/common/ElementLoader';
import { Category } from '@/types/category';
import { FaBan, FaTrash, FaEye, FaEdit, FaCheck } from 'react-icons/fa';
import ClickOutside from '@/components/ClickOutside';
import { toast } from 'react-toastify';
import EditCategoryModal from './EditCategoryModal';

const CategoriesTable = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [isActiveOpen, setIsActiveOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;
    const [language, setLanguage] = useState(2);
    const [isOpen, setIsOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const fetchCategories = async (page: number, lang: number , active: boolean) => {
        setLoading(true);
        try {
            const response = await fetch(`/backend/api/all-users/product-categories/paginated?language=${lang}&page=${page}&pageSize=${pageSize}&isActive=${active}`);
            const data = await response.json();
            if (data.status) {
                setCategories(data.data.data);
                setTotalCount(data.data.totalCount);
            } else {
                console.error("Failed to fetch categories:", data.message);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCategories(currentPage, language, isActive);
    }, [currentPage, language, isActive]);

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

    const handleOptionSelect = (option: number) => {
        setLanguage(option);
        setCurrentPage(1);
        setIsOpen(false);
    };

    const handleActiveOptionSelect = (option: boolean) => {
        setIsActive(option);
        setCurrentPage(1);
        setIsActiveOpen(false);
    };

    const handleFreeze = async (categoryId: number) => {
        try {
            const apiUrl = `/backend/api/admin/product-categories/${categoryId}/deactivate`;
            const response = await fetch(apiUrl, {
                method: "PUT",
            });
            if (response.ok) {
                await fetchCategories(currentPage, language, isActive);
                toast.success("Category frozen successfully!");
            } else {
                console.error("Failed to freeze category:", response.statusText);
                toast.error("Failed to freeze category!");
            }
        } catch (error) {
            console.error("Error freezing category:", error);
            toast.error("Failed to freeze category!");
        }
    };

    const handleActivate = async (categoryId: number) => {
        try {
            const apiUrl = `/backend/api/admin/product-categories/${categoryId}/activate`;
            const response = await fetch(apiUrl, {
                method: "PUT",
            });
            if (response.ok) {
                await fetchCategories(currentPage, language, isActive);
                toast.success("Category activated successfully!");
            } else {
                console.error("Failed to activate category:", response.statusText);
                toast.error("Failed to activate category!");
            }
        } catch (error) {
            console.error("Error activating category:", error);
            toast.error("Failed to activate category!");
        }
    };

    const handleDelete = async (categoryId: number) => {
        try {
            const apiUrl = `/backend/api/admin/product-categories/delete/${categoryId}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
            });
            if (response.ok) {
                await fetchCategories(currentPage, language, isActive);
                toast.success("Category deleted successfully!");
            } else {
                console.error("Failed to delete category:", response.statusText);
                toast.error("Failed to delete category!");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category!");
        }
    };

    const handleEdit = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        setEditModalOpen(true);
    };

    const closeEditModal = async () => {
        setEditModalOpen(false);
        await fetchCategories(currentPage, language, isActive);
    };

    return (
        <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-dark dark:text-white">All Categories</h2>
                <ClickOutside onClick={() => setIsOpen(false)}>
                    <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
                        <div
                            className={`py-[5px] pl-[9px] pr-[35px] text-sm font-medium text-dark dark:text-white ${isOpen ? "open" : ""}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Language
                            <span className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isOpen && "rotate-180"}`}>
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
                <ClickOutside onClick={() => setIsActiveOpen(false)}>
                    <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
                        <div
                            className={`py-[5px] pl-[9px] pr-[35px] text-sm font-medium text-dark dark:text-white ${isActiveOpen ? "open" : ""}`}
                            onClick={() => setIsActiveOpen(!isActiveOpen)}
                        >
                            Status
                            <span className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isActiveOpen && "rotate-180"}`}>
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
                                    />
                                </svg>
                            </span>
                        </div>
                        {isActiveOpen && (
                            <div className="absolute right-0 top-full z-40 mt-2 w-full rounded-[7px] border border-stroke bg-white py-1.5 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
                                <ul>
                                    <li
                                        onClick={() => handleActiveOptionSelect(true)}
                                        className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 2 ? "selected" : ""}`}
                                    >
                                        Active
                                    </li>
                                    <li
                                        onClick={() => handleActiveOptionSelect(false)}
                                        className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 1 ? "selected" : ""}`}
                                    >
                                        Inactive
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
                    {categories && categories.length > 0 ? (
                        <>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                                        <th className="px-4 py-2 font-medium text-dark dark:text-white text-start">Name</th>
                                        <th className="px-4 py-2 font-medium text-dark dark:text-white text-center">Products Count</th>
                                        <th className="px-4 py-2 font-medium text-dark dark:text-white text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id} className="border-b dark:border-dark-3">
                                            <td className="px-4 py-2 text-start">{category.name}</td>
                                            <td className="px-4 py-2 text-center">{category.productsCount}</td>
                                            <td className="px-4 py-2 flex items-center justify-end space-x-1.5 sm:space-x-3.5">
                                                <button
                                                    className="ml-2 hover:text-primary"
                                                    title="edit"
                                                    onClick={() => handleEdit(category.id)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                {
                                                    category.isActive ? (
                                                        <button
                                                            className="ml-2 hover:text-red-500"
                                                            title="inactive"
                                                            onClick={() => handleFreeze(category.id)}
                                                        >
                                                            <FaBan />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="ml-2 hover:text-green-500"
                                                            title="active"
                                                            onClick={() => handleActivate(category.id)}
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    )
                                                }
                                                {/* <button
                                                    className="ml-2 hover:text-red-500"
                                                    title="delete"
                                                    onClick={() => handleDelete(category.id)}
                                                >
                                                    <FaTrash />
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between mt-4">
                                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                                    Previous
                                </button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500">No categories found</p>
                        </div>
                    )}
                </>
            )}
            {editModalOpen && selectedCategoryId !== null && (
                <EditCategoryModal 
                    languageId={language} 
                    categoryId={selectedCategoryId} 
                    onClose={closeEditModal} 
                />
            )}
        </div>
    );
};

export default CategoriesTable;
