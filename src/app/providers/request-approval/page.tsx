import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
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
      <NewProviderRequests />
    </DefaultLayout>
  )
}

export default page