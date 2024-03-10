'use server';
import db from '@/lib/db/migrate';
import { environmentStatus } from '../db/schema';

export default async function SetEnvironmentInfo({
  temperature,
  humidity,
  sunlight,
}: {
  temperature: number;
  humidity: number;
  sunlight: number;
}) {
  try {
    await db.update(environmentStatus).set({
      temperature: temperature.toString(),
      humidity: humidity.toString(),
      sunlight: sunlight.toString(),
    });
    return { ok: true, message: 'Succesfully modified' };
  } catch (error) {
    return { ok: false, message: 'Something Went Wrong' };
  }
}
