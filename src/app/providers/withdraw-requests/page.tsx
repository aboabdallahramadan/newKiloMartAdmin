import DefaultLayout from '@/components/Layouts/DefaultLaout'
import WithdrawRequests from '@/components/Providers/WithdrawRequests'
import React from 'react'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
    title: "Providers Withdraw Requests",
    description: "Providers Withdraw Requests",
};


const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Withdraw Requests" />
        <WithdrawRequests />
    </DefaultLayout>
  )
}

export default page