import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import AllProducts from '@/components/Products/AllProducts';
export const metadata: Metadata = {
  title: "All Products",
  description: "All Products",
};


const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='All Products'/>
      <AllProducts />
    </DefaultLayout>
  )
}

export default page