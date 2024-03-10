import { FaLeaf } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CategoryButton from './categorybutton';
import { MotionLi } from '../framer-motion/MotionLi';
import { cn } from '@/lib/utils';
import Navbg from './navbg';
import { auth } from '@/auth';
import { FaUserAlt } from 'react-icons/fa';

export default async function Navbar() {
  const session = await auth();
  const navItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'All Products',
      url: '/products',
    },
    {
      title: session?.user ? session.user.name : 'Sign Up',
      url: session?.user ? '/user/dashboard' : '/user/signin',
    },
  ];
  return (
    <nav className={cn('w-screen fixed h-20 z-10 transition')}>
      <Navbg />
      <div className='z-10 container flex justify-between items-center text-white my-4'>
        <Button
          variant='ghost'
          className='text-xl border border-border/30 flex gap-2 justify-center items-center py-6 hover:bg-accent/10 hover:text-white'
        >
          <span className='text-3xl text-primary'>
            <FaLeaf />
          </span>
          NoobPlanter
        </Button>
        <ul className='flex gap-3'>
          <li>
            <CategoryButton />
          </li>
          {navItems.map((item, index) => (
            <MotionLi
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2, ease: 'easeInOut' }}
              className=' relative group'
              key={index}
            >
              <Button
                key={index}
                variant='ghost'
                className='text-lg hover:bg-accent/10 hover:text-white'
                asChild
              >
                <Link href={item.url}> {item.title} </Link>
              </Button>
              <div className='opacity-0 group-hover:opacity-70 duration-300 absolute h-0.5 -translate-x-1/2 left-1/2 rounded-full -bottom-2 bg-white w-4/5' />
            </MotionLi>
          ))}
        </ul>
      </div>
    </nav>
  );
}
