import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import DeliveryOrders from '@/components/Deliveries/DeliveryOrders';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DeliveryDetails from '@/components/Deliveries/DeliveryDetails';
import Withdrawals from '@/components/Withdrawals/Withdrawals';


export const metadata: Metadata = {
  title: "Delivery Details",
  description: "Delivery Details",
};

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Delivery Page'/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DeliveryDetails />
        <div className='flex flex-col gap-4'>
          <DeliveryOrders />
          <Withdrawals user='Delivery' />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default page