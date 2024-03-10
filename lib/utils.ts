import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function HealthStatusCalculator(diff: number, range: number) {
  if (diff < range) return 'good';
  else if (diff <= range * 1.5) return 'decent';
  else if (diff <= 2 * range) return 'not good';
  else if (diff <= 2.5 * range) return 'bad';
  else return 'very bad';
}
