import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkoutSubscription } from '@/lib/subscription';
import React, { FC, ReactNode } from 'react';
interface DashbOardLayoutProps {
  children: ReactNode;
}
const DashbOardLayout: FC<DashbOardLayoutProps> = async ({ children }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkoutSubscription();
  return (
    <div className="flex   h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex h-full fixed md:w-72 ">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <div className="md:pl-72 h-full w-full">
        <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </div>
    </div>
  );
};

export default DashbOardLayout;
