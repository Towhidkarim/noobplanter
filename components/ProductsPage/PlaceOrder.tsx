'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import Image from 'next/image';
import bkash from '@/assets/images/bkash.png';
import { Input } from '../ui/input';
import { z } from 'zod';
import { orderInsertSchema } from '@/lib/db/schema';
import { FormEvent } from 'react';
import PlaceOrderAction from '@/lib/actions/PlaceOrder';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function PlaceOrder({
  orderInfo,
}: {
  orderInfo: z.infer<typeof orderInsertSchema>;
}) {
  const router = useRouter();
  const formOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await PlaceOrderAction(orderInfo);
    if (res.ok) {
      toast('Success!', {
        description: res.message,
      });
      router.push('/user/dashboard');
    } else toast('Error!', { description: 'Something went wrong' });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='ml-auto font-bold'>Pay with Bkash</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-[#e2136e] border-none px-2'>
        <form onSubmit={formOnSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Image
                src={bkash}
                className='rounded-lg border-2 border-white'
                alt='bkash'
              />
            </AlertDialogTitle>
            <p className='w-full py-3 rounded-lg text-white border-white border grid place-content-center'>
              <span className='text-center'>
                Merchant: <b>NoobPlanter</b> <br />
                Invoice no. {Math.round(Math.random() * 500) + 100} <br />
                Amount: BDT {orderInfo.amountTotal}
              </span>
            </p>
            <div className='w-full py-5 px-5 rounded-lg text-white grid place-content-center gap-5 border-white border'>
              <label className='text-center'>
                Your Bkash Account Number
                <Input
                  className='bg-white w-80 text-black'
                  type='text'
                  required
                  placeholder='eg 01xxxxxxxxx'
                />
              </label>
              <label className='text-center'>
                Pin Number:
                <Input
                  type='password'
                  required
                  className='bg-white w-80 text-black'
                  maxLength={5}
                  placeholder='*****'
                />
              </label>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex justify-center items-center my-2 w-full'>
            <AlertDialogAction asChild>
              <Button type='submit' className='bg-[#bd1d5c] hover:bg-[#bd1d5c]'>
                Proceed
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel className='bg-[#bd1d5c] border-none text-white'>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
