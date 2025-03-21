import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import { Metadata } from "next"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import NewDeliveryRequests from '@/components/Deliveries/NewDeliveryRequests';
import InActiveDeliveries from '@/components/Deliveries/InActiveDeliveries';
export const metadata: Metadata = {
  title: "New Delivery Requests",
  description: "New Delivery Requests",
};
const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='New Delivery Requests'/>
      <div className='flex flex-col gap-4'>
        <InActiveDeliveries/>
        <NewDeliveryRequests/>
      </div>
    </DefaultLayout>
  )
}

export default page