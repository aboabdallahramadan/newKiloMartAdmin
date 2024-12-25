import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'
import { Metadata } from "next"
import AllDeliveries from '@/components/Deliveries/AllDeliveries';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DeliveriesDataStats from '@/components/Deliveries/DeliveriesDataStats';

export const metadata: Metadata = {
    title: "All Deliveries",
    description: "All Deliveries",
  };

const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='All Deliveries'/>
        <div className="flex flex-col gap-4">
          <DeliveriesDataStats />
          <AllDeliveries />
        </div>
    </DefaultLayout>
  )
}

export default page