import React from 'react'
import { Metadata } from "next";
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AllInformation from '@/components/ContactInformation/AllInformation';

export const metadata: Metadata = {
    title: "Contact Information",
    description: "Contact Information",
  };
  
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Contact Information' />
        <AllInformation />
    </DefaultLayout>
  )
}

export default page