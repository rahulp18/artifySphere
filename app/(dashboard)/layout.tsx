import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import React, { FC, ReactNode } from 'react';
interface DashbOardLayoutProps {
  children: ReactNode;
}
const DashbOardLayout: FC<DashbOardLayoutProps> = async ({ children }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex   h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex h-full fixed md:w-72 ">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <div className="md:pl-72 h-full w-full">
        <Navbar apiLimitCount={apiLimitCount} />
        {children}
      </div>
    </div>
  );
};

export default DashbOardLayout;
