import { Button } from '@/components/ui/button';
import Image from 'next/image';
import loginBg from '@/assets/images/hero/hero_7.webp';
import Link from 'next/link';
import { FaFacebook, FaGoogle, FaLeaf } from 'react-icons/fa';
import SignUpForm from '@/components/signin/SignUpForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageFade from '@/components/framer-motion/PageFade';

export default function SignUpPage() {
  return (
    <main className='h-svh overflow-hidden relative w-screen grid place-content-center'>
      <Image
        src={loginBg}
        alt=''
        className='-z-10 blur-md absolute w-full object-contain'
      />
      <ScrollArea className='w-[27rem] bg-background flex flex-col justify-between py-10 items-center border border-primary/50 shadow-lg rounded-2xl h-[95vh] m-auto'>
        <Button
          asChild
          variant='ghost'
          className='text-xl w-52 mx-auto font-semibold border border-border/70 flex gap-2 justify-center items-center py-6 hover:bg-accent/10 hover:opacity-90'
        >
          <Link href='/'>
            <span className='text-3xl  text-primary'>
              <FaLeaf />
            </span>
            NoobPlanter
          </Link>
        </Button>
        <p className='text-sm text-muted-foreground text-center'>
          Plants for everybody
        </p>
        <br />
        <h1 className='w-full text-center font-semibold text-xl'>
          Create your Account
        </h1>
        <SignUpForm />
        <span className='h-[1px] my-2 w-4/5 bg-border' />
        <p className='text-center mt-4 text-muted-foreground font-normal mx-auto w-4/5'>
          Sign up With
        </p>
        <div className='flex w-full px-10 gap-4'>
          <Button
            variant='outline'
            className='w-1/2 flex gap-2 justify-center items-center py-5'
          >
            <span className='text-blue-600 text-2xl'>
              <FaFacebook />
            </span>
            Facebook
          </Button>
          <Button
            variant='outline'
            className='w-1/2 flex gap-2 justify-center items-center py-5'
          >
            <span className='text-blue-600 text-2xl'>
              <FaGoogle />
            </span>
            Google
          </Button>
        </div>
        <p className='text-center my-2'>
          Have an account?{' '}
          <Link
            href='/user/signin'
            className='text-primary/95 hover:opacity-80 transition-colors'
          >
            Sign In here
          </Link>{' '}
        </p>
      </ScrollArea>
    </main>
  );
}
