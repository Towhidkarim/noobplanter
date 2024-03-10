'use client';
import hero1 from '@/assets/images/hero/hero_1.webp';
import hero2 from '@/assets/images/hero/hero_2.webp';
import hero3 from '@/assets/images/hero/hero_3.webp';
import hero4 from '@/assets/images/hero/hero_4.webp';
import hero5 from '@/assets/images/hero/hero_5.webp';
import hero6 from '@/assets/images/hero/hero_6.webp';
import hero7 from '@/assets/images/hero/hero_7.webp';
import { MotionDiv } from '@/components/framer-motion/MotionDiv';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { FaLeaf } from 'react-icons/fa';

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];

export default function Hero() {
  return (
    <main className='relative'>
      <div className='absolute grid place-content-center h-full w-full bg-black/50 z-0 '>
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: 'easeInOut' }}
          className='z-10'
        >
          <h1 className='md:text-5xl flex justify-center items-center text-4xl font-semibold text-white'>
            Welcome to &nbsp;
            <span className='flex bg-white/10 gap-3 justify-center border border-border/30 p-4 rounded-3xl items-center'>
              <span className='text-primary'>
                <FaLeaf />
              </span>
              NoobPlanter
            </span>
          </h1>
          <p className='text-accent/90 text-lg text-center my-2'>
            We help you know your plants better
          </p>
          <div className='flex gap-3 justify-center items-center'>
            <Button className='p-4'>See more</Button>
            <Button
              variant='outline'
              className='bg-transparent p-4 text-white border-primary hover:bg-primary hover:text-white'
            >
              Contact Us
            </Button>
          </div>
        </MotionDiv>
      </div>
      <Carousel
        className='w-full -z-20'
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {heroImages.map((value, index) => (
            <CarouselItem key={index}>
              <div className='h-svh '>
                <Image
                  src={value}
                  alt=''
                  className='object-cover h-full w-full'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
