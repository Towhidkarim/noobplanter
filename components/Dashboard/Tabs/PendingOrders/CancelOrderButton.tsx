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
import { Button } from '@/components/ui/button';
import ChangeOrderStatus from '@/lib/actions/ChangeOrderStatus';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CancelOrderButton({ orderID }: { orderID: number }) {
  const router = useRouter();
  const cancelOrder = async () => {
    const res = await ChangeOrderStatus({ status: 'cancelled', orderID });
    if (res.ok)
      toast('Done!', {
        description: res.message,
      });
    else toast('Something Went Wrong');
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className=' mx-auto grid place-items-end border'
        asChild
      >
        <Button variant='destructive' size='sm' className='mx-2 w-36 ml-auto'>
          Cancel Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will cancel your order from our
            list
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => cancelOrder()}
            className='bg-destructive hover:bg-destructive/80'
          >
            Cancel Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
