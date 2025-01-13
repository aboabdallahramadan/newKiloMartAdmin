import React from 'react';
import ProductOfferDetails from '@/components/Products/ProductOfferDetails';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Metadata } from 'next';
import ProductOfferOrders from '@/components/Products/ProductOfferOrders';

export const metadata: Metadata = {
    title: "Product's Details",
    description: "Product's Details",
  };
const page = () => {
    return (
        <DefaultLayout>
        <Breadcrumb pageName='Product Details' />
            <div className="p-6 flex flex-col gap-8">
                    <ProductOfferDetails />
                    <ProductOfferOrders />
            </div>
        </DefaultLayout>
    );
};

export default page;