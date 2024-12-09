import DefaultLayout from '@/components/Layouts/DefaultLaout'
import WithdrawRequests from '@/components/Withdrawals/WithdrawRequests'
import React from 'react'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
    title: "Deliveries Withdraw Requests",
    description: "Deliveries Withdraw Requests",
};


const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Withdraw Requests" />
        <WithdrawRequests user="Delivery" />
    </DefaultLayout>
  )
}

export default page