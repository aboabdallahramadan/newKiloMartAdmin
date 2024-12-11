import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AddProduct from '@/components/Products/AddProduct';
export const metadata: Metadata = {
  title: "Add new product",
  description: "Add new product",
};

const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Add new product'/>
        <AddProduct />
    </DefaultLayout>
  )
}

export default page