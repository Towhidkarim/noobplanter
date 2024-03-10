import Navbar from '@/components/Navbar/Navbar';
import OrdersDetail from '@/components/ProductsPage/OrdersDetail';
import PageFade from '@/components/framer-motion/PageFade';

export default function Orders() {
  return (
    <PageFade>
      <Navbar />
      <div className='h-20 w-full bg-black/80' />
      <OrdersDetail />
    </PageFade>
  );
}
