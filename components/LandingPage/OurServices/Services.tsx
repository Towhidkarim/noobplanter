import AnimateOnView from '@/components/framer-motion/AnimateOnView';
import React from 'react';
import { PiPlantBold } from 'react-icons/pi';
import { FiMessageCircle } from 'react-icons/fi';
import { TbArrowsExchange2 } from 'react-icons/tb';
import Image from 'next/image';
import serviceImage from '@/assets/images/flowers.jpg';

const serviceContent = [
  {
    title: 'Plant E-Comerce',
    icon: <PiPlantBold />,
    description: 'Buy from our exotic collection',
  },
  {
    title: 'Consultation Service',
    icon: <FiMessageCircle />,
    description: 'Consult with us about your plants',
  },
  {
    title: 'Plant Health Monitoring',
    icon: <TbArrowsExchange2 />,
    description: 'Monitor your plants with real time data',
  },
];

export default function Services() {
  return (
    <div className='w-full container my-10 flex flex-row justify-center items-center'>
      <div className='mx-auto my-6 overflow-hidden w-full'>
        <AnimateOnView delay={0}>
          <h1 className='text-5xl text-accent-foreground text-center font-semibold'>
            Services we Provide
          </h1>
          <hr className='w-64 h-1.5 rounded-full bg-primary mx-auto my-3' />
        </AnimateOnView>
        <br />
        <div className='flex w-full'>
          <div className='w-1/2 grid place-items-center'>
            <Image
              src={serviceImage}
              className='rounded-lg h-4/5 m-auto'
              alt='Flowers'
            />
          </div>
          <div className='w-1/2'>
            <div className='grid h-full place-content-center text-xl'>
              {serviceContent.map((value, index) => (
                <AnimateOnView
                  key={index}
                  className='flex gap-6 justify-start items-center my-4'
                  delay={0.25 * index}
                >
                  <span className='text-6xl text-primary'>{value.icon}</span>
                  <span className='font-semibold text-xl'>
                    {value.title} <br />
                    <p className='text-sm font-normal max-w-64'>
                      {value.description}
                    </p>
                  </span>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
