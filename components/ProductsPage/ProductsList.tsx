import db from '@/lib/db/migrate';
import { products, productsSelectSchema } from '@/lib/db/schema';
import { and, inArray, lte } from 'drizzle-orm';
import { z } from 'zod';
import ProductCard from '../ProductCard/ProductCard';
import { productImages } from '@/lib/constants';

export default async function ProductsList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categories = searchParams['cat'];
  const priceRange = searchParams['price'];
  let productsData: z.infer<typeof productsSelectSchema>[];
  if (!categories && !priceRange)
    productsData = await db.select().from(products).limit(15);
  else if (typeof categories === 'string')
    productsData = await db
      .select()
      .from(products)
      .where(
        and(
          inArray(products.category, categories.split(',')),
          lte(products.price, Number(priceRange ?? 10000))
        )
      )
      .limit(15);
  else productsData = await db.select().from(products).limit(15);

  return (
    <div className='flex flex-wrap justify-start gap-5 items-center p-2'>
      {productsData?.map((item, index) => {
        const img =
          productImages[Math.round(Math.random() * productImages.length)];
        return <ProductCard displayImg={img} productInfo={item} key={index} />;
      })}
    </div>
  );
}
