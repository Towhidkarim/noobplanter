import { auth } from '@/auth';
import Navbar from '@/components/Navbar/Navbar';
import FilterSection from '@/components/ProductsPage/FilterSection';
import ProductsList from '@/components/ProductsPage/ProductsList';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const categoryParam = searchParams['cat'] ?? null;
  const session = await auth();
  return (
    <main className='max-h-svh overflow-hidden'>
      <Navbar />
      <div className='h-20 bg-black/80' />
      <ShoppingCart />
      <section className='flex w-screen'>
        <FilterSection className='w-1/5 min-w-60 border' />
        <ScrollArea className='w-4/5 max-h-[calc(100svh-5rem)] border'>
          <ProductsList searchParams={searchParams} />
        </ScrollArea>
      </section>
    </main>
  );
}
