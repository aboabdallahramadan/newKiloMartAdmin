"use client"
import React, { useEffect, useState } from 'react'
import { Category } from '@/types/category'
import ClickOutside from '@/components/ClickOutside'


const CategorySelect = ({category, setCategory}: {category: number, setCategory: (category: number) => void}) => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [categories,setCategories] = useState<Omit<Category, "isActive" | "productsCount">[]>([])
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-users/product-categories/paginated?language=2&page=1&pageSize=99999&isActive=true`);
            const data = await response.json();
            if (data.status) {
                setCategories(data.data.data);
            } else {
                console.error("Failed to fetch categories:", data.message);
            }
        } catch (error) {
            console.error("An error occurred while fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    const handleCategorySelect = (option: number) => {
        setCategory(option);
        setIsCategoryOpen(false);
      };
  return (
    <ClickOutside onClick={() => setIsCategoryOpen(false)}>
        <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
            <div
            className={`py-[5px] pl-[9px] pr-[35px] text-sm font-medium text-dark dark:text-white ${isCategoryOpen ? "open" : ""}`}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
                category
                <span
                    className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isCategoryOpen && "rotate-180"}`}
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
            {isCategoryOpen && (
            <div className="absolute right-0 top-full z-40 mt-2 w-full rounded-[7px] border border-stroke bg-white py-1.5 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
                <ul>
                    {categories.map((singleCategory) => (
                    <li key={singleCategory.id}
                    onClick={() => handleCategorySelect(singleCategory.id)}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${category === singleCategory.id ? "selected" : ""}`}
                    >
                    {singleCategory.name}
                    </li>
                    ))
                    }
                </ul>
            </div>
            )}
        </div>
    </ClickOutside>
  )
}

export default CategorySelect