'use client';
import { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/constants';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { TCategory } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterSection({ className }: { className?: string }) {
  const [priceRange, setPriceRange] = useState(100);
  const [categoryArray, setCategoryArray] = useState<string[]>([]);
  const handleSelectionChange = (value: TCategory) => {
    if (categoryArray.includes(value))
      setCategoryArray((prev) =>
        prev.filter((cat) => (cat !== value ? cat : false))
      );
    else setCategoryArray((prev) => [...prev, value]);
  };
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      if (value === null) return '';
      const p = new URLSearchParams(params.toString());
      p.set(name, value);
      return p.toString();
    },
    [params]
  );
  useEffect(() => {
    const catArray = params.get('cat');
    if (catArray) setCategoryArray(catArray.split(','));
    setPriceRange(Number(params.get('price') ?? '100'));
  }, []);
  const pushParams = () => {
    const catString = categoryArray.length > 0 ? categoryArray.join() : null;
    router.push(
      path +
        '?' +
        (catString ? 'cat=' + catString + '&' : '') +
        'price=' +
        priceRange
    );
  };
  return (
    <ScrollArea className={cn('h-[calc(100svh-5rem)] px-4', className)}>
      <br />
      <h1 className='text-lg font-medium'>Categories</h1>
      <div className='mx-auto w-full flex flex-col justify-center items-start my-3'>
        {categories.map((value, index) => (
          <label
            key={index}
            className='flex  gap-2 mx-10 justify-start transition items-center select-none cursor-pointer w-3/5 active:scale-95 hover:bg-primary/10 p-2 rounded-xl'
          >
            <Checkbox
              checked={categoryArray.includes(value)}
              onCheckedChange={() => handleSelectionChange(value)}
              className='rounded-[5px]'
              id={value}
            />
            <span className='capitalize'>{value}</span>
          </label>
        ))}
      </div>
      <hr className='w-full h-[1px] bg-black/70' />
      <h1 className='text-lg font-medium my-5'>Price Range</h1>
      <p className='pb-2'>Price Within: {priceRange}</p>
      <Slider
        className='w-3/5 mx-10 my-2 cursor-pointer'
        value={[priceRange]}
        min={100}
        max={2000}
        step={10}
        onValueChange={(value) => setPriceRange(value[0])}
        defaultValue={[100]}
      />
      <div className='w-full mx-10 my-4'>
        <Button
          onClick={pushParams}
          className='rounded-xl font-semibold my-2 m-auto w-3/5'
        >
          Apply Filters
        </Button>
      </div>
      <hr className='w-full h-[1px] bg-black/70' />
    </ScrollArea>
  );
}
