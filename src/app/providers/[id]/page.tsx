import DefaultLayout from '@/components/Layouts/DefaultLaout';
import { Metadata } from 'next';
import ProviderDetails from '@/components/Providers/ProviderDetails';
import ProviderOrders from '@/components/Providers/ProviderOrders';
import ProviderProducts from '@/components/Providers/ProviderProducts';
import ProviderMap from '@/components/Providers/ProviderMap';

export const metadata: Metadata = {
  title: "Provider Details",
  description: "Provider Details",
};

const page = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProviderDetails />
        <ProviderOrders />
        <ProviderProducts />
        <ProviderMap />
      </div>
    </DefaultLayout>
  );
}

export default page;