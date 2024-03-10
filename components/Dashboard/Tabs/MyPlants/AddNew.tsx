'use client';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { plantsInsertSchema } from '@/lib/db/schema';
import { z } from 'zod';
import { toast } from 'sonner';
import AddPlantEntry from '@/lib/actions/AddPlantEntry';
import { useRouter } from 'next/navigation';

export default function AddNew() {
  const nameRef = useRef('');
  const waterRef = useRef(0);
  const humidity = useRef(0);
  const sunlight = useRef(0);
  const router = useRouter();

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: z.infer<typeof plantsInsertSchema> = {
      name: nameRef.current,
      optimalWater: waterRef.current,
      optimalHumidity: humidity.current,
      optimalSunlight: sunlight.current,
    };
    const parsedData = plantsInsertSchema.safeParse(data);
    if (!parsedData.success) {
      toast('Error', {
        description: 'Invalid Data',
      });
      return;
    }
    const res = await AddPlantEntry(parsedData.data);
    if (res.ok) {
      toast('Succesful!', { description: res.message });
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='mx-3'>
          <b className='text-2xl mx-2'>+</b>
          Add New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          onSubmit={formOnSubmit}
          className='w-full mx-auto flex flex-col gap-5'
        >
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Add New Entry
            </AlertDialogTitle>
            {/* <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription> */}
            <label>
              Plant Name:
              <Input
                type='text'
                placeholder='Product Name'
                onChange={(e) => (nameRef.current = e.target.value)}
              />
            </label>
            <label>
              Water Cycle (Interval Hour):
              <Input
                type='number'
                placeholder='WaterCycle Interval (h)'
                min={0}
                onChange={(e) => (waterRef.current = Number(e.target.value))}
              />
            </label>
            <label>
              Optimal Humidity
              <Input
                type='number'
                placeholder='Humidity (%)'
                onChange={(e) => (humidity.current = Number(e.target.value))}
              />
            </label>
            <label>
              Optimal Sunlight
              <Input
                type='number'
                placeholder='Sunlight (%)'
                onChange={(e) => (sunlight.current = Number(e.target.value))}
              />
            </label>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                type='submit'
                className='w-full text-lg font-semibold p-4'
              >
                <span className='text-3xl font-bold'>+ &nbsp;</span> Add Entry
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
