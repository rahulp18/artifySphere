import React from 'react';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[#0C1A1A] overflow-auto h-screen">
      <div className="mx-auto max-w-screen-xl h-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
