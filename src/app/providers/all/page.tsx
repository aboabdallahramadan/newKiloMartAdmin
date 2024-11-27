import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";
import AllProviders from "@/components/Providers/AllProviders";
export const metadata: Metadata = {
  title: "KiloMart Admin Panel",
  description: "KiloMart Admin Panel",
};


const page = () => {
  return (
    <DefaultLayout>
      <AllProviders />
    </DefaultLayout>
  )
}

export default page