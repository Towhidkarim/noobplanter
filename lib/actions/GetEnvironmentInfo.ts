'use server';
import db from '@/lib/db/migrate';
import { environmentStatus } from '../db/schema';

export default async function GetEnvironmentInfo() {
  const environmentData = await db.select().from(environmentStatus).limit(1);
  return { ...environmentData[0] };
}
