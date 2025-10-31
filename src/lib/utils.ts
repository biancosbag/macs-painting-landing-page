import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimestampInLimaTimezone(): string {
  // UTC-5 for Lima, Peru timezone
  const date = new Date();
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  const limaTime = new Date(utcTime + (3600000 * -5));
  return limaTime.toISOString();
}
