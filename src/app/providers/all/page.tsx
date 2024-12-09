import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import AllProviders from "@/components/Providers/AllProviders";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AllMap from '@/components/Providers/AllMap';
export const metadata: Metadata = {
  title: "All Providers",
  description: "All Providers",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='All Providers'/>
      <div className='grid grid-cols-1 gap-4'>
        <AllProviders />
        <AllMap />
      </div>
    </DefaultLayout>
  )
}

export default page