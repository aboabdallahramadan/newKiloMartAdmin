import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import AllProviders from "@/components/Providers/AllProviders";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AllMap from '@/components/Providers/AllMap';
import ProvidersDataStats from '@/components/Providers/ProvidersDataStats';
export const metadata: Metadata = {
  title: "All Providers",
  description: "All Providers",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='All Providers'/>
      <div className='grid grid-cols-1 gap-4'>
        <ProvidersDataStats/>
        <AllProviders />
        <AllMap />
      </div>
    </DefaultLayout>
  )
}

export default page