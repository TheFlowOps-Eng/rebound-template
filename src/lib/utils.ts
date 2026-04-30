/**
 * cn — classNames helper. Concatenates truthy strings with a space.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * mod — true modulo (handles negatives correctly for carousel indexing)
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
