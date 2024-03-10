import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { FaAngleDown } from 'react-icons/fa6';

export default function CategoryButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='group' asChild>
        <Button
          variant='ghost'
          className='text-lg hover:bg-accent/10 hover:text-white'
        >
          Categories &nbsp;
          <span className='group-data-[state=open]:rotate-180 duration-300'>
            <FaAngleDown />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Plants</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>House Plants</DropdownMenuItem>
              <DropdownMenuItem>Outdoor Plants</DropdownMenuItem>
              <DropdownMenuItem>Mixed Plants</DropdownMenuItem>
              <DropdownMenuItem>Herbs</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Pots</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Large Pots</DropdownMenuItem>
                <DropdownMenuItem>Medium Pots</DropdownMenuItem>
                <DropdownMenuItem>Small Pots</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuSub>
        <DropdownMenuItem>Consultation</DropdownMenuItem>
        <DropdownMenuItem>Others</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
