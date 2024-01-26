import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="h-full flex items-center justify-center gap-y-4 flex-col">
      <div className="w-10 h-10 relative animate-spin">
        <Image fill alt="logo" src="/logo.png" />
      </div>
      <p className="text-muted-foreground text-sm">Rahul is thinking...</p>
    </div>
  );
};

export default Loader;
