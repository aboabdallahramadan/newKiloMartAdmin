"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ElementLoader from '@/components/common/ElementLoader';
import { Category } from '@/types/category';
import { FaBan, FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import ClickOutside from '@/components/ClickOutside';
import { getSession } from 'next-auth/react';

const CategoriesTable = () => {
    const [categories, setCategories] = useState<Omit<Category, 'productsCount' | "isActive">[]>([
        { id: 1, name: "Electronics"},
        { id: 2, name: "Groceries" },
        { id: 3, name: "Fashion" },
        { id: 4, name: "Home & Garden" },
        { id: 5, name: "Sports" },
        { id: 6, name: "Books"},
        { id: 7, name: "Beauty" },
        { id: 8, name: "Toys" },
        { id: 9, name: "Automotive" },
        { id: 10, name: "Health" }
    ]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;
    const [language, setLanguage] = useState(2);
    const [isOpen, setIsOpen] = useState(false);

    const fetchCategories = async (page: number, lang: number) => {
        const session = await getSession();
        const token = session?.user
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-users/product-categories/paginated?language=${lang}&page=${page}&pageSize=${pageSize}&isActive=true`, {
            headers: {
                Authorization: `Bearer ${token}`
              },
        });
        const data = await response.json();
        if (data.status) {
            setCategories(data.data.data);
            setTotalCount(data.data.totalCount);
        } else {
            console.error("Failed to fetch categories:", data.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        // fetchCategories(currentPage, language);
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

    const handleOptionSelect = (option: number) => {
        setLanguage(option);
        setCurrentPage(1);
        setIsOpen(false);
      };

    return (
        <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-dark dark:text-white">Active Categories</h2>
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
                {categories.length > 0 ? (
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
                                        <td className="px-4 py-2 text-center">10</td>
                                        <td className="px-4 py-2 flex items-center justify-end space-x-1.5 sm:space-x-3.5">
                                            <Link href={`/products/categories/${category.id}`} className="hover:text-primary hover:text-primary-hover" title='view products'>
                                                <FaEye />
                                            </Link>
                                            <button className="ml-2 hover:text-primary" title='edit'>
                                                <FaEdit />
                                            </button>
                                            <button className="ml-2 hover:text-red-500" title='inactive'>
                                                <FaBan />
                                            </button>
                                            <button className="ml-2 hover:text-red-500" title='delete'>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between mt-4">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
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
        </div>
    );
};

export default CategoriesTable;