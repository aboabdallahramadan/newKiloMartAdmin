import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import BreadCrump from '@/components/Breadcrumbs/Breadcrumb'
import CustomerDetails from '@/components/Customers/CustomerDetails'
import CustomerOrders from '@/components/Customers/CustomerOrders'
import { Metadata } from 'next'
import CustomerLocations from '@/components/Customers/CustomerLocations'
import LocationsTable from '@/components/Customers/LocationsTable'

export const metadata: Metadata = {
    title: "Customer's Details",
    description: "Customer's Details",
  };
const page = () => {
  return (
    <DefaultLayout>
        <BreadCrump pageName='Customer Details' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <CustomerDetails />
            <CustomerOrders />
            <div className='col-span-1 md:col-span-2'>
                <LocationsTable />
            </div>
            <div className='col-span-1 md:col-span-2'>
                <CustomerLocations />
            </div>
        </div>
    </DefaultLayout>
  )
}

export default page