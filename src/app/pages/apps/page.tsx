import React from 'react'
import { Metadata } from "next";
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AppsSettings from '@/components/AppsSettings/AppsSettings';

export const metadata: Metadata = {
    title: "Apps Settings",
    description: "Apps Settings",
  };
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Apps Settings' />
        <AppsSettings />
    </DefaultLayout>
  )
}

export default page