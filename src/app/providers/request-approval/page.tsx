import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiloMart Admin Panel",
  description: "KiloMart Admin Panel",
};


const page = () => {
  return (
    <DefaultLayout>
      <div>RequestApproval</div>
    </DefaultLayout>
  )
}

export default page