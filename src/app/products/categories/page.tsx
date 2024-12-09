import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
    title: "Categories",
    description: "Categories",
  };
const page = () => {
  return (
    <DefaultLayout >
        <Breadcrumb pageName='Categories' />

    </DefaultLayout>
  )
}

export default page