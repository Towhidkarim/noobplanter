'use client';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import PageFade from './framer-motion/PageFade';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageFade>
        <Toaster />
        {children}
      </PageFade>
    </SessionProvider>
  );
}
