import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import EditProduct from '@/components/Products/EditProduct';
export const metadata: Metadata = {
  title: "Edit Product",
  description: "Edit Product",
};

const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Edit Product'/>
        <EditProduct />
    </DefaultLayout>
  )
}

export default page