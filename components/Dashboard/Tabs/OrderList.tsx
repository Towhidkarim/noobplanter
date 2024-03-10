import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { orderInsertSchema } from '@/lib/db/schema';
import { z } from 'zod';
import CancelOrderButton from './PendingOrders/CancelOrderButton';

export default function OrderList({
  orderInfo,
}: {
  orderInfo: z.infer<typeof orderInsertSchema>;
}) {
  return (
    <Accordion type='single' className='' collapsible>
      <AccordionItem value='item-1' className='border rounded-2xl mx-2'>
        <AccordionTrigger className='w-full '>
          <div className='w-full flex justify-evenly capitalize'>
            <div>{orderInfo.orderID}</div>
            <div> {orderInfo.orderDate}</div>
            <div> {orderInfo.status}</div>
            <div> {orderInfo.amountTotal}</div>
            <div> {orderInfo.paid ? 'Paid' : 'Cash on Delivery'}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className=''>
          <div className='w-4/5 flex justify-evenly mx-auto mb-2 border-b font-semibold'>
            <div className='w-1/4 text-left'>Product Name</div>
            <div className='w-1/4 text-center'>Count</div>
            <div className='w-1/4 text-right'>Unit Price</div>
          </div>
          {orderInfo.orderDetails?.map((item, index) => (
            <div key={index} className='w-4/5 flex justify-evenly mx-auto my-2'>
              <div className='w-1/4 text-left'>{item.name}</div>
              <div className='w-1/4 text-center'>{item.count}</div>
              <div className='w-1/4 text-right'>{item.price}</div>
            </div>
          ))}
          <div className='w-4/5 mx-auto'>
            <CancelOrderButton orderID={orderInfo.orderID ?? 0} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
