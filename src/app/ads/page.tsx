import React from 'react'
import { Metadata } from 'next'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Ads from '@/components/Ads/Ads'

export const metadata: Metadata = {
    title: 'Ads',
    description: 'Ads',
  }
const page = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Ads' />
        <Ads />
    </DefaultLayout>
  )
}

export default page