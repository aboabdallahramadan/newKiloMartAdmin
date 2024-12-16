import React from 'react'
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import ProductOffers from '@/components/offers/ProductOffers';

export const metadata: Metadata = {
    title: "Product Offers",
    description: "Product Offers",
  };
  
const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Product Offers' />
      <ProductOffers />
    </DefaultLayout>
  )
}

export default page