import React from 'react';
import ProductDetails from '@/components/Products/ProductDetails';
import ProductOffersTable from '@/components/Products/ProductOffersTable';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Product's Details",
    description: "Product's Details",
  };
const page = () => {
    return (
        <DefaultLayout>
        <Breadcrumb pageName='Product Details' />
            <div className="p-6 flex flex-col gap-8">
                <ProductDetails />
                <ProductOffersTable />
            </div>
        </DefaultLayout>
    );
};

export default page;