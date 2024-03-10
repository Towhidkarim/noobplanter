'use server';

import { z } from 'zod';
import { orderInsertSchema, orders, users } from '../db/schema';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db/migrate';
import { eq } from 'drizzle-orm';

export default async function PlaceOrderAction({
  amountTotal,
  orderDetails,
  paid,
}: z.infer<typeof orderInsertSchema>) {
  const session = await auth();
  if (!session?.user?.email) redirect('/');
  try {
    const userData = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email));
    await db
      .insert(orders)
      .values({ amountTotal, orderBy: userData[0].id, orderDetails, paid });
    return { ok: true, message: 'Order Placed Succesfully' };
  } catch (error) {
    return { ok: false, message: 'Something Went Wrong' };
  }
}
