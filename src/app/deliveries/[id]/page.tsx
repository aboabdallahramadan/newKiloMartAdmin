import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import DeliveryOrders from '@/components/Deliveries/DeliveryOrders';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DeliveryDetails from '@/components/Deliveries/DeliveryDetails';
import Withdrawals from '@/components/Deliveries/Withdrawals';


export const metadata: Metadata = {
  title: "Provider Details",
  description: "Provider Details",
};

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Delivery Page'/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DeliveryDetails />
        <DeliveryOrders />
        <Withdrawals />
      </div>
    </DefaultLayout>
  )
}

export default page