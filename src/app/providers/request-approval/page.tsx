import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import AccountsRequests from '@/components/Users/AccountsRequests';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Providers Requests",
  description: "New Providers Requests",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='New Provider Requests' />
      <AccountsRequests user='Provider'/>
    </DefaultLayout>
  )
}

export default page