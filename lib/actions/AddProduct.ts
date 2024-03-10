'use server';
import z from 'zod';
import { products, productsInsertSchema, users } from '../db/schema';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import db from '@/lib/db/migrate';
import { eq } from 'drizzle-orm';

export default async function AddProductEntry({
  name,
  price,
  category,
  description,
}: z.infer<typeof productsInsertSchema>) {
  const session = await auth();
  if (!session?.user?.email) redirect('/user/signin');
  try {
    const userData = await db
      .select({ id: users.id, role: users.role })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);
    await db
      .insert(products)
      .values({ name, category, price, description, addedBy: userData[0].id });
    return { ok: true, message: 'Product Listed Succesfully' };
  } catch (error) {
    return { ok: false, message: 'Something Went Wrong' };
  }
}
