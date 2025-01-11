import DefaultLayout from '@/components/Layouts/DefaultLaout';
import { Metadata } from 'next';
import ProviderDetails from '@/components/Providers/ProviderDetails';
import ProviderOrders from '@/components/Providers/ProviderOrders';
import ProviderProducts from '@/components/Providers/ProviderProducts';
import ProviderMap from '@/components/Providers/ProviderMap';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Withdrawals from '@/components/Withdrawals/Withdrawals';
import Profiles from '@/components/Providers/Profiles';

export const metadata: Metadata = {
  title: "Provider Details",
  description: "Provider Details",
};

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Provider Page'/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProviderDetails />
        <ProviderOrders />
        <ProviderProducts />
        <Withdrawals user='Provider' />
        <div className='col-span-1 md:col-span-2'>
          <ProviderMap />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <Profiles />
        </div>

      </div>
    </DefaultLayout>
  );
}

export default page;