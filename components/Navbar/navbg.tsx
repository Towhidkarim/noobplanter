'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function Navbg() {
  const [darkgBg, setDarkBg] = useState(false);
  const changeBG = () => {
    if (window.scrollY >= 200) setDarkBg(true);
    else setDarkBg(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBG);
    return () => window.removeEventListener('scroll', changeBG);
  }, []);
  return (
    <div
      className={cn(
        'w-screen fixed h-20 -z-10 transition',
        darkgBg ? 'bg-accent-foreground/80 backdrop-blur' : ''
      )}
    ></div>
  );
}
