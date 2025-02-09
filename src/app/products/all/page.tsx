import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ActiveProducts from '@/components/Products/ActiveProducts';
export const metadata: Metadata = {
  title: "All Products",
  description: "All Products",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='All Products'/>
      <div className='flex flex-col gap-4'>
        <ActiveProducts />
      </div>
    </DefaultLayout>
  )
}

export default page