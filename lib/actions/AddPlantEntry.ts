'use server';
import { z } from 'zod';
import { plants, plantsInsertSchema, users } from '../db/schema';
import { auth } from '@/auth';
import db from '@/lib/db/migrate';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

export default async function AddPlantEntry({
  name,
  optimalHumidity,
  optimalWater,
  optimalSunlight,
}: z.infer<typeof plantsInsertSchema>) {
  const session = await auth();
  if (!session?.user?.email) redirect('/');
  try {
    const userData = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email));
    await db.insert(plants).values({
      name,
      optimalHumidity,
      optimalWater,
      optimalSunlight,
      ownerID: userData[0].id,
    });
    return { ok: true, message: 'Plant Entry Added Succesfully' };
  } catch (error) {
    return { ok: false, message: 'Something went wrong' };
  }
}
