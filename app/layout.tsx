import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/components/modal-provider';
import ToasterProvider from '@/components/toaster-provider';
import CrispChatProvider from '@/components/crisp-chat-provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtifySphere',
  description: 'The Power of AI in creativity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispChatProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
