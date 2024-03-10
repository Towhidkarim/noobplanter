'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { HiShoppingCart } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function ShoppingCart() {
  const { cart, removeFromCart, changeQuantity } = useStore();

  const cartTableColumns = [
    'Product Name',
    'Product Price',
    'Product Quantity',
    'Total Price',
  ];
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='flex flex-col p-2 shadow-xl z-20 h-16 w-16 rounded-3xl absolute right-[5%] bottom-[5%]'>
          <span className='text-5xl relative'>
            <span className='h-5 w-5 p-2 absolute grid place-content-center -right-4 rounded-full bg-destructive text-white text-xs'>
              {cart.length}
            </span>
            <HiShoppingCart />
          </span>
          {/* <span>Cart</span> */}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='text-center font-semibold'>
            Your Shopping Cart
          </DrawerTitle>
        </DrawerHeader>
        <div className='md:w-4/5 w-full px-4 mx-auto flex flex-col justify-center items-center gap-2'>
          {cart.map((item, index) => (
            <>
              <div key={index} className='flex w-full py-2'>
                <div className='w-2/5 font-bold text-left'>{item.name}</div>
                <div className='w-1/4 text-center'>{item.price}</div>
                <div className='w-1/4 text-center flex justify-center items-center gap-2'>
                  <Button
                    onClick={() => changeQuantity(item.tempID, -1)}
                    className='h-6 w-6 rounded-full font-semibold p-1 text-xl'
                  >
                    -
                  </Button>
                  x{item.count}
                  <Button
                    onClick={() => changeQuantity(item.tempID, 1)}
                    className='h-6 w-6 rounded-full font-semibold p-1 text-xl'
                  >
                    +
                  </Button>
                </div>
                <div className='w-1/4 text-center'>
                  {item.count * item.price}
                </div>
                <Button
                  onClick={() => removeFromCart(item.tempID)}
                  variant='destructive'
                  className='rounded-xl p-2 text-2xl'
                >
                  <MdDeleteForever />
                </Button>
              </div>
              <hr className='w-full' />
            </>
          ))}
          <div className='ml-auto w-1/4 text-center'>
            Net Total:{' '}
            <span className='font-bold'>
              {cart.reduce((acc, item) => acc + item.price * item.count, 0)}
            </span>
          </div>
        </div>
        <DrawerFooter className='flex flex-col items-center'>
          <Button
            disabled={cart.length === 0}
            className='w-64  text-base'
            asChild
          >
            <Link href='/products/orders'>Order Now</Link>
          </Button>
          <DrawerClose asChild>
            <Button className='w-44' variant='outline'>
              Not Now
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
