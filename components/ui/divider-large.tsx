import { cn } from '@/lib/utils';

function DividerLarge({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        'w-64 mx-auto bg-primary rounded-full h-1.5 my-2',
        className
      )}
    />
  );
}

export default DividerLarge;
