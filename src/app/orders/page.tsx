import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import { Metadata } from 'next'
import AllOrders from '@/components/Orders/AllOrders';

export const metadata: Metadata = {
    title: "All Orders",
    description: "All Orders",
  };
  
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Orders' />
        <AllOrders />
    </DefaultLayout>
  )
}

export default page