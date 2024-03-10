import PageFade from '@/components/framer-motion/PageFade';
import React from 'react';
import PlantCard from '../../PlantCard/PlantCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import AddNew from './AddNew';
import db from '@/lib/db/migrate';
import { plants, users } from '@/lib/db/schema';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export default async function MyPlants() {
  const session = await auth();
  if (!session?.user?.email) redirect('/user/signin');
  const userData = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);
  const plantData = await db
    .select()
    .from(plants)
    .where(eq(plants.ownerID, userData[0].id));
  return (
    <PageFade className='max-w-screen-xl py-4'>
      <h1 className='text-xl text-center font-bold mb-4'>
        Manage your Plants
        <span>
          <AddNew />
        </span>
      </h1>
      <ScrollArea className='w-full'>
        <div className='flex flex-row gap-5 mb-6 mx-2 '>
          {plantData.map((item, index) => (
            <PlantCard
              plantID={item.id}
              plantName={item.name}
              humidity={item.optimalHumidity ?? -1}
              light={item.optimalSunlight ?? -1}
              water={item.optimalWater ?? -1}
              key={index}
            />
          ))}
        </div>
        <br />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </PageFade>
  );
}
