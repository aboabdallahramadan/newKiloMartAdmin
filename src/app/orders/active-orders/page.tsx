import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ActiveOrders from '@/components/Orders/ActiveOrders';

export const metadata: Metadata = {
    title: "Active Orders",
    description: "Active Orders",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Active Orders'/>
        <ActiveOrders />
    </DefaultLayout>
  )
}

export default page