import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import BreadCrump from '@/components/Breadcrumbs/Breadcrumb'
import AllCustomers from '@/components/Customers/AllCustomers'
import AllCustomersMap from '@/components/Customers/AllCustomersMap'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Customers",
    description: "Customers",
  };
const page = () => {
  return (
    <DefaultLayout>
        <BreadCrump pageName='Customers' />
        <div className='flex flex-col gap-8'>
            <AllCustomers />
            <AllCustomersMap />
        </div>
    </DefaultLayout>
  )
}

export default page