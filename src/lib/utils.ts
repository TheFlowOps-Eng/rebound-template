import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * mod — true modulo (handles negatives correctly for carousel indexing)
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
