'use client';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Logo from '../ui/logo';
import LoginAuth from '@/lib/actions/LoginAuth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import SignUpAuth from '@/lib/actions/SignUpAuth';

export default function SignUpForm() {
  const [currentError, setCurrentError] = useState('');
  const mailRef = useRef('');
  const userNameRef = useRef('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const router = useRouter();

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await SignUpAuth({
      email: mailRef.current,
      username: userNameRef.current,
      password: password,
    });

    // const res = await LoginAuth({
    //   email: mailRef.current,
    //   password: password,
    // });
    toast(res?.ok ? 'Success!' : 'Registration Failed', {
      description: res?.message,
      duration: 4000,
    });
    if (!res?.ok) setCurrentError(res?.message ?? '');
    else router.push('/user/signin');
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
          Username:
          <Input
            pattern='^[a-zA-Z\-]+$'
            type='text'
            placeholder='Username'
            onChange={(e) => (userNameRef.current = e.target.value)}
            required
          />
        </label>
        <br />
        <label className={labelClass}>
          Password:
          <Input
            type='password'
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label className={labelClass}>
          Confirm Password:
          <Input
            type='password'
            placeholder='********'
            pattern={password}
            onChange={(e) => setConfPassword(e.target.value)}
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
