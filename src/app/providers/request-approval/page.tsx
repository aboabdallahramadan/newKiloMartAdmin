import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import InActiveProviders from '@/components/Providers/InActiveProviders';
import NewProviderRequests from '@/components/Providers/NewProvidersRequests';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Providers Requests",
  description: "New Providers Requests",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='New Provider Requests' />
      <div className='flex flex-col gap-4'>
        <InActiveProviders />
        <NewProviderRequests />
      </div>
    </DefaultLayout>
  )
}

export default page