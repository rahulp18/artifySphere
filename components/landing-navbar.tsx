'use client';
import React from 'react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });
const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-2 md:mr-4">
          <Image src="/logo.png" alt="logo" fill />
        </div>
        <h1
          className={cn(
            'md:text-2xl text-xl font-bold text-white',
            montserrat.className,
          )}
        >
          Artify Sphere
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : 'signup'}>
          <Button className="rounded-full" variant="outline">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
