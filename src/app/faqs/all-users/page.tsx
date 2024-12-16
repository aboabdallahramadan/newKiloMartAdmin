import React from 'react'
import { Metadata } from 'next'
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AllUsers from '@/components/Faqs/AllUsers';


export const metadata: Metadata = {
    title: "FAQs For All Users",
    description: "FAQs For All Users",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='FAQs' />
        <AllUsers />
    </DefaultLayout>
  )
}

export default page