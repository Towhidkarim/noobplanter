'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import GetEnvironmentInfo from '@/lib/actions/GetEnvironmentInfo';
import SetEnvironmentInfo from '@/lib/actions/SetEnvironmentInfo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { PiSunLight } from 'react-icons/pi';
import { toast } from 'sonner';

export default function Controls({
  temperature,
  humidity,
  sunlight,
}: {
  temperature: number;
  humidity: number;
  sunlight: number;
}) {
  const [modifiedData, setModifiedData] = useState({
    temperature,
    humidity,
    sunlight,
  });
  const router = useRouter();

  const applyChanges = async () => {
    const res = await SetEnvironmentInfo(modifiedData);
    if (res.ok) toast('Succesful!', { description: res.message });
    else toast('Error!', { description: res.message });
    router.refresh();
  };
  return (
    <div className='min-w-44 p-5 my-5 mx-auto border min-h-64 flex flex-col gap-5 rounded-xl shadow-lg'>
      <h1 className='font-semibold text-2xl'>Controls</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 text-destructive font-medium'>
          <span className='text-2xl '>
            <FaTemperatureHalf />
          </span>
          Temperature : {modifiedData.temperature}
        </div>
        <Slider
          className='cursor-pointer'
          defaultValue={[modifiedData.temperature]}
          max={50}
          min={0}
          step={1}
          onValueChange={(value) =>
            setModifiedData((prev) => ({ ...prev, temperature: value[0] }))
          }
        />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 text-blue-600 font-medium'>
          <span className='text-2xl '>
            <MdOutlineWaterDrop />
          </span>
          Humidity : {modifiedData.humidity}
        </div>
        <Slider
          className='cursor-pointer'
          defaultValue={[modifiedData.humidity]}
          max={99}
          min={10}
          step={1}
          onValueChange={(value) =>
            setModifiedData((prev) => ({ ...prev, humidity: value[0] }))
          }
        />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 text-yellow-400 font-medium'>
          <span className='text-2xl '>
            <PiSunLight />
          </span>
          Sunlight : {modifiedData.sunlight}
        </div>
        <Slider
          className='cursor-pointer'
          defaultValue={[modifiedData.sunlight]}
          onValueChange={(value) =>
            setModifiedData((prev) => ({ ...prev, sunlight: value[0] }))
          }
          max={100}
          min={0}
          step={1}
        />
      </div>
      <Button onClick={() => applyChanges()} className='font-semibold text-lg'>
        Apply Changes
      </Button>
    </div>
  );
}
