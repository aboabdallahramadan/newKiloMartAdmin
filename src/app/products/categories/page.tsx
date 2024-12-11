import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ActiveCategories from '@/components/Products/Categories/ActiveCategories';
import InactiveCategories from '@/components/Products/Categories/InactiveCategories';
import AddNewCategory from '@/components/Products/Categories/AddNewCategory';

export const metadata: Metadata = {
    title: "Categories",
    description: "Categories",
  };
const page = () => {
  return (
    <DefaultLayout >
        <Breadcrumb pageName='Categories' />
        <div className='flex flex-col gap-4'>
          <ActiveCategories />
          <InactiveCategories />
          <AddNewCategory />
        </div>
    </DefaultLayout>
  )
}

export default page