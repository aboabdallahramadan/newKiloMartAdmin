import React from 'react';
import ProductDetails from '@/components/Products/ProductDetails';
import ProductOffersTable from '@/components/Products/ProductOffersTable';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';
import ProductOrders from '@/components/Products/ProductOrders';

export const metadata: Metadata = {
    title: "Product's Details",
    description: "Product's Details",
  };
const page = () => {
    return (
        <DefaultLayout>
        <Breadcrumb pageName='Product Details' />
            <div className="p-6 flex flex-col gap-8">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <ProductDetails />
                    <ProductOrders />
                </div>
                <ProductOffersTable />
            </div>
        </DefaultLayout>
    );
};

export default page;