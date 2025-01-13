import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProvidersProducts from '@/components/Products/ProvidersProducts';


export const metadata: Metadata = {
    title: "Providers Products",
    description: "Providers Products",
  };
  

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Providers Products'/>
      <div className='flex flex-col gap-4'>
        <ProvidersProducts/>
      </div>
    </DefaultLayout>
  )
}

export default page