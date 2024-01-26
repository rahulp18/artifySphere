import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React, { FC } from 'react';
interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
}
const Heading: FC<HeadingProps> = ({
  title,
  description,
  icon: Icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="px-4 lg:p-8 flex items-center gap-x-3 mb-8">
      <div className={cn('p-2 w-fit rounded-md', bgColor)}>
        <Icon className={cn('w-10 h-10', iconColor)} />
      </div>
      <div className="">
        <h2 className="md:text-3xl text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
