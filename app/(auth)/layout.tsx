import React, { FC, ReactNode } from 'react';
interface DashbOardLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<DashbOardLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen ">{children}</div>
  );
};

export default AuthLayout;
