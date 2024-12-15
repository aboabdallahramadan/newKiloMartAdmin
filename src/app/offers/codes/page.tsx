import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DiscountCodes from '@/components/offers/DiscountCodes';


export const metadata: Metadata = {
    title: "Discount Codes",
    description: "Discount Codes",
  };
  
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Discount Codes" />
        <DiscountCodes />
    </DefaultLayout>
  )
}

export default page