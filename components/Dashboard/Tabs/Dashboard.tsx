import { auth } from '@/auth';
import PageFade from '@/components/framer-motion/PageFade';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardHome() {
  const session = await auth();
  if (!session?.user) redirect('/user/signin');
  return (
    <PageFade>
      <h1 className='text-xl p-5 font-medium'>Welcome, {session.user.name}</h1>
    </PageFade>
  );
}
