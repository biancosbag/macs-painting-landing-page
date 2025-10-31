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
  
  // Format manually to preserve Lima time in ISO format
  const year = limaTime.getFullYear();
  const month = String(limaTime.getMonth() + 1).padStart(2, '0');
  const day = String(limaTime.getDate()).padStart(2, '0');
  const hours = String(limaTime.getHours()).padStart(2, '0');
  const minutes = String(limaTime.getMinutes()).padStart(2, '0');
  const seconds = String(limaTime.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-05:00`;
}
