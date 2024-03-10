'use client';
import React from 'react';
import Logo from '../ui/logo';
import StatusWidget from '../Dashboard/StatusWidget/StatusWidget';
import { MdOutlineLogout } from 'react-icons/md';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardNav() {
  return (
    <nav className='container overflow-hidden h-20'>
      <div className='flex w-full justify-between items-center my-2 overflow-hidden'>
        <div className='scale-90 md:scale-100'>
          <Logo />
        </div>

        <div className=' h-14 rounded-xl px-5 py-2'>
          {/* <StatusWidget /> */}
          <Button
            onClick={() => signOut()}
            variant='ghost'
            className='text-2xl translate-x-4'
          >
            <MdOutlineLogout />
          </Button>
        </div>
      </div>
    </nav>
  );
}
