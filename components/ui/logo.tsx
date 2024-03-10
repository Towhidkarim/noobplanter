import Link from 'next/link';
import { Button } from './button';
import { FaLeaf } from 'react-icons/fa';

export default function Logo() {
  return (
    <Button
      asChild
      variant='ghost'
      className='text-xl border border-border/70 flex gap-2 justify-center items-center py-6 hover:bg-accent/10 hover:text-foreground/70'
    >
      <Link href='/'>
        <span className='text-3xl text-primary'>
          <FaLeaf />
        </span>
        NoobPlanter
      </Link>
    </Button>
  );
}
