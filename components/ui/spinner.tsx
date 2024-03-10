import { cn } from '@/lib/utils';
import { ImSpinner9 } from 'react-icons/im';

export default function Spinner({ className }: { className?: string }) {
  return (
    <span className={cn('text-2xl animate-spin', className)}>
      <ImSpinner9 />
    </span>
  );
}
