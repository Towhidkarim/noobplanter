'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IoMdHeart } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { Button } from '../ui/button';
import { TbCurrencyTaka } from 'react-icons/tb';
import { TProduct } from '@/lib/types';
import { z } from 'zod';
import { productsSelectSchema } from '@/lib/db/schema';
import { useStore } from '@/lib/store';
import { productImages } from '@/lib/constants';
import Image, { StaticImageData } from 'next/image';

export default function ProductCard({
  productInfo,
  displayImg,
}: {
  productInfo: z.infer<typeof productsSelectSchema>;
  displayImg?: StaticImageData;
}) {
  const { addToCart } = useStore();

  const { name, description, id, category, price } = productInfo;
  const img =
    displayImg ??
    productImages[Math.round(Math.random() * productImages.length)];

  return (
    <Card className='shadow-md rounded-2xl min-w-72 relative py-2 px-4 m-2'>
      <CardTitle className='text-right absolute right-5 top-5 text-rose-600 grid place-items-end text-3xl p-2'>
        {/* <IoMdHeart /> */}
      </CardTitle>
      <CardContent className='pb-2'>
        <figure className='h-60 w-44 mx-auto m-4 mt-8'>
          <Image src={img} className='h-60 object-contain rounded-xl' alt='' />
        </figure>
        <p className='text-lg font-medium'>{name}</p>
        <span className='flex gap-1 text-yellow-400 my-2 ml-2'>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </span>
      </CardContent>
      <CardFooter className='flex justify-between items-end py-2 mb-2'>
        <span className='font-semibold flex flex-col text-xl'>
          <span className='text-muted-foreground text-sm font-light'>
            Price
          </span>
          <span className='flex gap-0.5 justify-center items-center -translate-x-2'>
            <span className='text-2xl -translate-y-0.5'>
              <TbCurrencyTaka />
            </span>
            {productInfo.price}
          </span>
        </span>
        <Button
          onClick={() =>
            addToCart({
              name,
              id,
              count: 1,
              price,
              tempID: id.toString() + (Math.random() * 1000).toString(),
            })
          }
          variant='outline'
          className='border-primary/60'
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
