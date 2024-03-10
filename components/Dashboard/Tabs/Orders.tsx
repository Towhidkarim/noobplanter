import { auth } from '@/auth';
import PageFade from '@/components/framer-motion/PageFade';
import { redirect } from 'next/navigation';
import db from '@/lib/db/migrate';
import { orders, users } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import OrderList from './OrderList';

export default async function Orders() {
  const session = await auth();
  if (!session?.user?.email) redirect('/user/signin');
  const userData = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email));
  const orderData = await db
    .select()
    .from(orders)
    .where(eq(orders.orderBy, userData[0].id))
    .orderBy(desc(orders.orderID));
  return (
    <PageFade>
      <h1 className='text-xl p-5 font-medium'>Your Orders</h1>
      <div className='flex flex-col gap-2'>
        <div className='w-full flex justify-evenly border-b my-4'>
          <div>Order ID</div>
          <div> Order Date</div>
          <div> Order Status</div>
          <div> Total Amount</div>
          <div> Payment</div>
        </div>
        {orderData.map((item, index) => (
          <OrderList key={index} orderInfo={item} />
        ))}
      </div>
    </PageFade>
  );
}
