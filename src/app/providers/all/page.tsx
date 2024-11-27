import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import AllProviders from "@/components/Providers/AllProviders";
export const metadata: Metadata = {
  title: "All Providers",
  description: "All Providers",
};


const page = () => {
  return (
    <DefaultLayout>
      <AllProviders />
    </DefaultLayout>
  )
}

export default page