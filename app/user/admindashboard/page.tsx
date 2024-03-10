import DashboardHome from '@/components/Dashboard/Tabs/Dashboard';
import Navbar from '@/components/Navbar/Navbar';
import PageFade from '@/components/framer-motion/PageFade';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoBagCheck } from 'react-icons/io5';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';
import Orders from '@/components/Dashboard/Tabs/Orders';
import db from '@/lib/db/migrate';
import { environmentStatus, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AddProduct from '@/components/Dashboard/Tabs/AddProduct/AddProduct';
import Controls from '@/components/Dashboard/Controls/Controls';
import DashboardNav from '@/components/Navbar/DashboardNav';

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user?.email) redirect('/user/signin');
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user?.email))
    .limit(1);
  const environmentData = await db.select().from(environmentStatus);
  if (userData[0].role === 'user') redirect('/user/signin');
  const tabsContents = [
    {
      title: 'pending',
      component: <DashboardHome />,
      icon: <IoBagCheck />,
    },
    {
      title: 'controls',
      component: (
        <Controls
          humidity={Number(environmentData[0].humidity)}
          sunlight={Number(environmentData[0].sunlight)}
          temperature={Number(environmentData[0].temperature)}
        />
      ),
      icon: <IoMdSettings />,
    },
    {
      title: 'Add',
      component: <AddProduct />,
      icon: <IoIosAddCircleOutline />,
    },
  ];
  return (
    <PageFade>
      <DashboardNav />
      <Tabs
        defaultValue={tabsContents[0].title}
        className='h-[calc(100svh-5rem)] w-screen overflow-hidden flex gap-0'
      >
        <ScrollArea className='h-[calc(100svh-5rem)] container mx-auto'>
          {tabsContents.map((value, index) => (
            <TabsContent key={index} value={value.title}>
              {value.component}
            </TabsContent>
          ))}
        </ScrollArea>
        <div className='absolute -translate-x-1/2 left-1/2 bottom-[5%]'>
          <TabsList className='flex gap-8 px-10 py-8 h-14 rounded-2xl border shadow-lg'>
            {tabsContents.map((value, index) => (
              <TabsTrigger
                className='flex min-w-20 flex-col h-14 -translate-y-7 p-2 data-[state=active]:bg-primary/10 relative justify-center items-center group opacity-80 data-[state=active]:font-semibold text-primary 
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
