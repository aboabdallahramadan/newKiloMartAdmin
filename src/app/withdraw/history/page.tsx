import DefaultLayout from '@/components/Layouts/DefaultLaout'
import WithdrawalsHistory from '@/components/Withdrawals/WithdrawalsHistory'
import React from 'react'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
    title: "Withdrawals History",
    description: "Withdrawals History",
};


const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Withdrawals History" />
        <WithdrawalsHistory/>
    </DefaultLayout>
  )
}

export default page