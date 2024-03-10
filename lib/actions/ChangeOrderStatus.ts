'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db/migrate';
import { orders } from '../db/schema';
import { eq } from 'drizzle-orm';

export default async function ChangeOrderStatus({
  status,
  orderID,
}: {
  status: 'processing' | 'cancelled' | 'confirmed' | 'delivering' | 'delivered';
  orderID: number;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect('/user/signin');
  try {
    await db.update(orders).set({ status }).where(eq(orders.orderID, orderID));
    return {
      ok: true,
      message: `Order Status changed to ${status} succesfully`,
    };
  } catch (error) {
    return { ok: false, message: `Something went wrong` };
  }
}
