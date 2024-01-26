'use client';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Code,
  Image,
  MessageSquare,
  Music,
  Video,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'Image Generation',
    icon: Image,
    href: '/image',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Video Generation',
    icon: Video,
    href: '/video',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
];
const DashBoardPage = () => {
  const router = useRouter();
  return (
    <div className="">
      <div className="mb-8 space-y-4">
        <h3 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h3>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map(item => (
          <Card
            onClick={() => router.push(item.href)}
            key={item.href}
            className={cn(
              'p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer',
            )}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-md', item.bgColor)}>
                <item.icon className={cn('w-8 h-8', item.color)} />
              </div>
              <h3 className="font-semibold">{item.label}</h3>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashBoardPage;
