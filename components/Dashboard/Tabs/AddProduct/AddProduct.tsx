'use client';
import PageFade from '@/components/framer-motion/PageFade';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AddProductEntry from '@/lib/actions/AddProduct';
import { categories } from '@/lib/constants';
import { productsInsertSchema } from '@/lib/db/schema';
import { FormEvent, useRef } from 'react';
import { toast } from 'sonner';

export default function AddProduct() {
  const nameRef = useRef('');
  const catRef = useRef('');
  const priceRef = useRef(0);
  const descriptionRef = useRef('');

  const formOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedData = productsInsertSchema.safeParse({
      name: nameRef.current,
      category: catRef.current,
      price: priceRef.current,
      description: descriptionRef.current,
    });
    if (!parsedData.success) {
      toast('Error', {
        description: 'Invalid Data',
      });
      return;
    }
    const res = await AddProductEntry(parsedData.data);
    if (res.ok) toast('Succesful!', { description: 'Entry Added Succesfully' });
  };
  return (
    <PageFade>
      <h1 className='text-lg text-center font-semibold'>
        Add a Product Listing
      </h1>
      <form
        onSubmit={formOnSubmit}
        className='w-[30rem] mx-auto flex flex-col gap-5'
      >
        <label>
          Product Name:
          <Input
            type='text'
            placeholder='Product Name'
            onChange={(e) => (nameRef.current = e.target.value)}
          />
        </label>
        <label>
          Product Category:
          <Select onValueChange={(value) => (catRef.current = value)}>
            <SelectTrigger className='capitalize'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((value, index) => (
                <SelectItem key={index} className='capitalize' value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label>
          Price:
          <Input
            type='number'
            defaultValue={0}
            min={0}
            onChange={(e) => (priceRef.current = Number(e.target.value))}
          />
        </label>
        <label>
          Description:
          <Textarea
            placeholder='Product Description'
            onChange={(e) => (descriptionRef.current = e.target.value)}
          />
        </label>
        <Button type='submit' className='w-full text-lg font-semibold p-4'>
          <span className='text-xl font-bold'>+ &nbsp;</span> Add Product
        </Button>
      </form>
    </PageFade>
  );
}
