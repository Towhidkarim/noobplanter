'use client';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Logo from '../ui/logo';
import LoginAuth from '@/lib/actions/LoginAuth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const [currentError, setCurrentError] = useState('');
  const mailRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await LoginAuth({
      email: mailRef.current,
      password: passwordRef.current,
    });
    toast(res?.ok ? 'Login Succesful!' : 'Login Failed', {
      description: res?.message,
      duration: 4000,
    });
    if (!res?.ok) setCurrentError(res?.message ?? '');
    else router.push('/user/dashboard');
  };
  const labelClass = 'my-2 font-medium';
  return (
    <div className='w-full px-10'>
      <form onSubmit={formOnSubmit} className='w-full'>
        <label className={labelClass}>
          Email:
          <Input
            type='email'
            placeholder='user@mail.com'
            onChange={(e) => (mailRef.current = e.target.value)}
            required
          />
        </label>
        <br />
        <label className={labelClass}>
          Password:
          <Input
            type='password'
            placeholder='********'
            onChange={(e) => (passwordRef.current = e.target.value)}
            required
          />
        </label>
        <div className='text-rose-500 min-h-5 text-base text-center font-semibold my-2'>
          {currentError}
        </div>
        <Button type='submit' className='w-full my-2 font-bold text-md py-5'>
          Sign In
        </Button>
      </form>
    </div>
  );
}
