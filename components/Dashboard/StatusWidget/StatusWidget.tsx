'use client';
import GetEnvironmentInfo from '@/lib/actions/GetEnvironmentInfo';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { PiSunLight } from 'react-icons/pi';

export default function StatusWidget() {
  const { setEnviromentData, environmentData } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      {
        const newData = await GetEnvironmentInfo();
        const dataToNumeric = {
          temperature: Number(newData.temperature),
          humidity: Number(newData.humidity),
          sunlight: Number(newData.sunlight),
        };
        setEnviromentData(dataToNumeric);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3500);
    return () => clearInterval(interval);
  }, []);

  const itemClasses =
    'flex flex-col justify-center items-center gap-1 rounded-lg';
  return (
    <div
      className='flex flex-col bg-white z-10 absolute right-2 top-1/2 -translate-y-1/2 border rounded-full
     p-2 py-4 shadow-lg justify-between items-center gap-6 select-none cursor-pointer hover:shadow-xl transition'
    >
      <div className={itemClasses}>
        <span className='text-2xl text-rose-500'>
          <FaTemperatureHalf />
        </span>
        {`${environmentData.temperature ?? 0}°`}
      </div>
      <div className={itemClasses}>
        <span className='text-2xl text-blue-500'>
          <MdOutlineWaterDrop />
        </span>
        {`${environmentData.humidity ?? 0}%`}
      </div>
      <div className={itemClasses}>
        <span className='text-2xl text-yellow-500'>
          <PiSunLight />
        </span>
        {`${environmentData.sunlight ?? 0}%`}
      </div>
    </div>
  );
}
