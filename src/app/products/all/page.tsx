import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
export const metadata: Metadata = {
  title: "All Products",
  description: "All Products",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='All Products'/>
        
    </DefaultLayout>
  )
}

export default page