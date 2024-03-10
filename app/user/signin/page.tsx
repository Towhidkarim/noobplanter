import SignInForm from '@/components/signin/SignInForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import loginBg from '@/assets/images/hero/hero_5.webp';
import Link from 'next/link';
import { FaFacebook, FaGoogle, FaLeaf } from 'react-icons/fa';

export default function SignInPage() {
  return (
    <main className='h-svh overflow-hidden relative w-screen grid place-content-center'>
      <Image
        src={loginBg}
        alt=''
        className='-z-10 blur-md absolute w-full object-contain'
      />
      <section className='w-[26rem] bg-background flex flex-col justify-between py-10 items-center border border-primary/50 shadow-lg rounded-2xl h-[90vh] m-auto'>
        <Button
          asChild
          variant='ghost'
          className='text-xl mt-5 font-semibold border border-border/70 flex gap-2 justify-center items-center py-6 hover:bg-accent/10 hover:opacity-90'
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
          Sign In to NoobPlanter
        </h1>
        <SignInForm />
        <span className='h-[1px] my-2 w-4/5 bg-border' />
        <p className='text-center text-muted-foreground font-normal w-4/5'>
          Sign in With
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
        <br /> <br />
        <h1>
          Dont have an account?{' '}
          <Link
            className='hover:opacity-85 transition text-primary'
            href='/user/signup'
          >
            Sign Up now
          </Link>
        </h1>
      </section>
    </main>
  );
}
