'use client';
import plantImage from '@/assets/images/hero/hero_5.webp';
import Image from 'next/image';
import { GiWateringCan, GiHealthNormal } from 'react-icons/gi';
import { PiSunLight } from 'react-icons/pi';
import { IoWaterSharp } from 'react-icons/io5';
import PlantInfo from './PlantInfo';
import { useStore } from '@/lib/store';
import { HealthStatusCalculator } from '@/lib/utils';

export default function PlantCard({
  plantID,
  plantName,
  water,
  light,
  humidity,
}: {
  plantID: number;
  plantName: string;
  water: number;
  light: number;
  humidity: number;
}) {
  const { environmentData } = useStore();
  const sunlightDiff = Math.abs(environmentData.sunlight - light);
  const humidityDiff = Math.abs(environmentData.humidity - humidity);
  const temptDiff = Math.abs(environmentData.temperature - 20);
  const sunHealth = HealthStatusCalculator(sunlightDiff, 8);
  const humidHealth = HealthStatusCalculator(humidityDiff, 10);
  const tempHealth = HealthStatusCalculator(temptDiff, 5);

  let totalHealth =
    1 - (sunlightDiff + humidityDiff + temptDiff) / ((8 + 10 + 5) * 3);
  // console.log(sunlightDiff + humidityDiff + temptDiff);
  if (totalHealth < 0) totalHealth = 0.05;
  else if (totalHealth > 1) totalHealth = 0.99;

  return (
    <div className='h-[60vh] max-h-[600px] cursor-pointer select-none group mr-4 min-w-80 flex flex-col justify-end relative w-1/4 rounded-2xl shadow-xl border overflow-hidden'>
      <Image
        src={plantImage}
        className='absolute inset-0 -z-10 object-cover h-full duration-500 group-hover:scale-110'
        alt='flowers'
      />
      <div className='h-1/2 p-5 py-8 bg-gradient-to-t from-black to-black/0 text-white'>
        <h1 className='text-2xl font-semibold'>{plantName}</h1>
        <hr className='bg-white' />
        <div className='flex w-full justify-around my-3'>
          <div className='flex flex-col gap-4'>
            <PlantInfo
              icon={<GiWateringCan />}
              title='Water'
              text={`In ${water}h`}
            />
            <PlantInfo
              icon={<GiHealthNormal />}
              title='Health'
              danger={totalHealth < 0.5}
              text={`${Math.round(totalHealth * 100).toString()}%`}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <PlantInfo
              danger={
                sunHealth === 'bad' ||
                sunHealth === 'very bad' ||
                sunHealth === 'not good'
              }
              icon={<PiSunLight />}
              title='Light'
              text={sunHealth}
            />
            <PlantInfo
              danger={
                humidHealth === 'bad' ||
                humidHealth === 'very bad' ||
                sunHealth === 'not good'
              }
              icon={<IoWaterSharp />}
              title='Humid'
              text={humidHealth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
