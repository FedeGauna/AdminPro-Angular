/**
 * Fractal rendering parameters.
 * These parameters control the position, scale, rotation, color, and growth of the fractal.
 */
export interface FractalParams {
  /** Center X coordinate on canvas. */
  centerX: number;
  /** Center Y coordinate on canvas. */
  centerY: number;
  /** Size/scale of the fractal. */
  size: number;
  /** Rotation angle in radians. */
  rotation: number;
  /** Hue value for color (0-360). */
  hue: number;
  /** Growth factor (0-1) that controls progressive growth (tree depth/branching). */
  growth?: number;
}