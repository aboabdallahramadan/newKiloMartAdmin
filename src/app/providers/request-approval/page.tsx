import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import AccountsRequests from '@/components/Providers/AccountsRequests';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiloMart Admin Panel",
  description: "KiloMart Admin Panel",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='New Provider Requests' />
      <AccountsRequests />
    </DefaultLayout>
  )
}

export default page