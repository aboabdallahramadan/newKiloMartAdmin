import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import FreeDelivery from '@/components/offers/FreeDelivery';

export const metadata: Metadata = {
    title: "Free Delivery Offers",
    description: "Free Delivery Offers",
  };
  
const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Free Delivery Offers' />
      <FreeDelivery />
    </DefaultLayout>
  )
}

export default page