/**
 * Fractal rendering parameters.
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

/**
 * Interface for fractal renderers.
 */
export interface FractalRenderer {
  /** Unique identifier for the fractal type. */
  readonly id: string;

  /** Human-readable display name. */
  readonly name: string;

  /** Maximum recursion depth for fractal generation. */
  readonly depth: number;

  /** Metadata including author and historical information. */
  readonly description: FractalDescription;

  /**
   * Renders the fractal on the given canvas context.
   * @param ctx Canvas 2D rendering context.
   * @param params Rendering parameters including position, size, rotation, and color.
   */
  render(ctx: CanvasRenderingContext2D, params: FractalParams): void;
}