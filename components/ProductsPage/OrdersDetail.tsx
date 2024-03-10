'use client';
import { useStore } from '@/lib/store';
import { Button } from '../ui/button';
import { MdDeleteForever } from 'react-icons/md';
import PlaceOrder from './PlaceOrder';

export default function OrdersDetail() {
  const { cart, changeQuantity, removeFromCart } = useStore();
  return (
    <div className='w-full border rounded-xl max-w-screen-md p-5 my-5 mx-auto'>
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
            <div className='w-1/4 text-center'>{item.count * item.price}</div>
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
      <div className='ml-auto w-1/4 text-center my-5'>
        Net Total:{' '}
        <span className='font-bold'>
          {cart.reduce((acc, item) => acc + item.price * item.count, 0)}
        </span>
      </div>
      <br />
      <h1 className='text-lg font-semibold'>Place order</h1>
      <hr />
      <div className='grid place-items-end my-2'>
        <PlaceOrder
          orderInfo={{
            amountTotal: cart.reduce(
              (acc, item) => acc + item.price * item.count,
              0
            ),
            status: 'processing',
            paid: true,
            orderDetails: cart.map((item) => ({
              count: item.count,
              id: item.id,
              name: item.name,
              price: item.price,
            })),
          }}
        />
      </div>
    </div>
  );
}
