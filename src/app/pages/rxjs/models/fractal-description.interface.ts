/**
 * Contains metadata about a fractal including author and historical information.
 */
export interface FractalDescription {
  /** Brief description of the fractal. */
  summary: string;
  /** Author's name. */
  author: string;
  /** Author's birth year. */
  authorBorn: number;
  /** Author's death year. */
  authorDied?: number;
  /** Year of discovery or publication. */
  yearDiscovered: number;
  /** Key characteristic of the fractal. */
  characteristic: string;
}