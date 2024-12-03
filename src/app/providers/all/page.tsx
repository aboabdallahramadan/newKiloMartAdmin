import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import AllProviders from "@/components/Providers/AllProviders";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
export const metadata: Metadata = {
  title: "All Providers",
  description: "All Providers",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='All Providers'/>
      <AllProviders />
    </DefaultLayout>
  )
}

export default page