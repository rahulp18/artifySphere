import Image from 'next/image';
import React from 'react';
interface EmptyProps {
  label: string;
}
const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex items-center justify-center h-full flex-col p-20">
      <div className="relative h-72 w-72">
        <Image fill src="/empty.png" alt="empty" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

export default Empty;
