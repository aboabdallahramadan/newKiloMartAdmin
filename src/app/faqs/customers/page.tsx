import React from 'react'
import { Metadata } from 'next'
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Customers from '@/components/Faqs/Customers';


export const metadata: Metadata = {
    title: "FAQs For Customers",
    description: "FAQs For Customers",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='FAQs' />
        <Customers />
    </DefaultLayout>
  )
}

export default page