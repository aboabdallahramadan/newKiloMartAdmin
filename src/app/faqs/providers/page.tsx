import React from 'react'
import { Metadata } from 'next'
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Providers from '@/components/Faqs/Providers';


export const metadata: Metadata = {
    title: "FAQs For Providers",
    description: "FAQs For Providers",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='FAQs' />
        <Providers />
    </DefaultLayout>
  )
}

export default page