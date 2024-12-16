import React from 'react'
import { Metadata } from 'next'
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Deliveries from '@/components/Faqs/Deliveries';


export const metadata: Metadata = {
    title: "FAQs For Deliveries",
    description: "FAQs For Deliveries",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='FAQs' />
        <Deliveries />
    </DefaultLayout>
  )
}

export default page