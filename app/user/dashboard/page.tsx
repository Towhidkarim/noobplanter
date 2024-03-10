import DashboardHome from '@/components/Dashboard/Tabs/Dashboard';
import Navbar from '@/components/Navbar/Navbar';
import PageFade from '@/components/framer-motion/PageFade';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AiFillHome } from 'react-icons/ai';
import { PiPlantFill } from 'react-icons/pi';
import { FaBagShopping } from 'react-icons/fa6';
import Orders from '@/components/Dashboard/Tabs/Orders';
import db from '@/lib/db/migrate';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import MyPlants from '@/components/Dashboard/Tabs/MyPlants/MyPlants';
import DashboardNav from '@/components/Navbar/DashboardNav';
import StatusWidget from '@/components/Dashboard/StatusWidget/StatusWidget';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user?.email) redirect('/user/signin');
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user?.email))
    .limit(1);
  // if (userData[0].role === 'admin') redirect('/user/admin');
  const tabsContents = [
    {
      title: 'home',
      component: <DashboardHome />,
      icon: <AiFillHome />,
    },
    {
      title: 'plants',
      component: <MyPlants />,
      icon: <PiPlantFill />,
    },
    {
      title: 'orders',
      component: <Orders />,
      icon: <FaBagShopping />,
    },
  ];
  return (
    <PageFade className='w-screen overflow-hidden min-h-svh'>
      <DashboardNav />
      <StatusWidget />
      {/* <div className='h-20 bg-black/80' /> */}
      <Tabs
        defaultValue={tabsContents[0].title}
        className='h-[calc(100svh-5rem)] w-screen overflow-hidden flex gap-0'
      >
        <div className='h-[calc(100svh-5rem)] container mx-auto'>
          {userData[0].role === 'admin' ? (
            <Button variant='outline' asChild>
              <Link href='/user/admindashboard'>Admin Panel </Link>
            </Button>
          ) : (
            ''
          )}
          {tabsContents.map((value, index) => (
            <TabsContent key={index} value={value.title}>
              {value.component}
            </TabsContent>
          ))}
        </div>
        <div className='absolute -translate-x-1/2 left-1/2 bottom-[5%]'>
          <TabsList className='flex gap-8 px-10 py-8 h-20 items-center rounded-2xl border shadow-lg'>
            {tabsContents.map((value, index) => (
              <TabsTrigger
                className='flex flex-col h-14 p-2 data-[state=active]:bg-primary/10 relative justify-center items-center group opacity-80 data-[state=active]:font-semibold text-primary 
                 transition-all rounded-xl gap-1 data-[state=active]:scale-105 data-[state=active]:opacity-100'
                key={index}
                value={value.title}
              >
                <span className='text-2xl focus-visible:text-primary text-primary'>
                  {value.icon}
                </span>
                <span className='text-sm text-muted-foreground capitalize'>
                  {value.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </PageFade>
  );
}
