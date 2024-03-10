import { cn } from '@/lib/utils';
import { GiWateringCan } from 'react-icons/gi';

export default function PlantInfo({
  icon,
  title,
  text,
  danger,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  danger?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex justify-start items-center gap-3',
        danger ? 'text-destructive' : 'text-white'
      )}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex text-xs flex-col justify-center items-center'>
          <span className='text-3xl p-1'>{icon}</span>
          {title}
        </div>
      </div>
      <span className='font-semibold capitalize'>{text}</span>
    </div>
  );
}
