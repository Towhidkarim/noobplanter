import ProductCard from '@/components/ProductCard/ProductCard';
import AnimateOnView from '@/components/framer-motion/AnimateOnView';
import DividerLarge from '@/components/ui/divider-large';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import db from '@/lib/db/migrate';
import { products } from '@/lib/db/schema';

async function Products() {
  const productData = await db.select().from(products).limit(6);
  return (
    <section className='container mx-auto flex flex-col'>
      <h1 className='text-center font-semibold text-4xl'>Our Products</h1>
      <DividerLarge />

      <Link
        href='/products'
        className='text-right w-fit ml-auto hover:opacity-75 transition text-green-700'
      >
        View More...
      </Link>

      <ScrollArea className='w-full whitespace-nowrap '>
        <div className='flex w-auto gap-4 my-4 justify-between items-center'>
          {productData.map((value, index) => (
            <AnimateOnView
              verticalAnimation={false}
              key={index}
              delay={index * 0.2}
            >
              <ProductCard productInfo={value} />
            </AnimateOnView>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}

export default Products;
