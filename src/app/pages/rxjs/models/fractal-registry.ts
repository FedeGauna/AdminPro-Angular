import { AbstractFractal } from '../fractals/fractal-base';
import { KochSnowflakeFractal } from '../fractals/koch-snowflake.fractal';
import { PythagorasTreeFractal } from '../fractals/pythagoras-tree.fractal';

/**
 * Represents a fractal option for the selector.
 */
export interface FractalOption {
  /** Unique identifier for the fractal type. */
  id: string;
  /** Display name shown in the selector. */
  name: string;
  /** Factory function to create the fractal instance. */
  factory: () => AbstractFractal;
}

/**
 * Registry of available fractals.
 * Add new entries here to make fractals available in the selector.
 * Each fractal must extend AbstractFractal and implement FractalRenderer.
 */
export const FRACTAL_OPTIONS: FractalOption[] = [
  {
    id: 'koch-snowflake',
    name: 'Koch-Snowflake',
    factory: () => new KochSnowflakeFractal()
  },
  {
    id: 'pythagoras-tree',
    name: 'Pythagoras-Tree',
    factory: () => new PythagorasTreeFractal()
  }
];

/**
 * Gets the default fractal option.
 * @returns The default fractal option (Koch-Snowflake).
 */
export function getDefaultFractalOption(): FractalOption {
  return FRACTAL_OPTIONS[0];
}

/**
 * Finds a fractal option by its id.
 * @param id The fractal identifier to search for.
 * @returns The fractal option if found, undefined otherwise.
 */
export function findFractalById(id: string): FractalOption | undefined {
  return FRACTAL_OPTIONS.find(option => option.id === id);
}