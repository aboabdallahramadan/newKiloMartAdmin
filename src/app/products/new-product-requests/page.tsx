import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import ProductRequests from '@/components/Products/ProductRequests';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "New Product Requests",
    description: "New Product Requests",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='New Product Requests'/>
        <ProductRequests />
    </DefaultLayout>
  )
}

export default page