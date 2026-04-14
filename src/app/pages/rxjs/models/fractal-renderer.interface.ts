import { FractalParams } from './fractal-params.interface';
import { FractalDescription } from './fractal-description.interface';

/**
 * Interface for fractal renderers.
 * This interface defines the contract that all fractal implementations must follow.
 * 
 * @extends FractalDescription - Each renderer must provide metadata about the fractal
 * @uses FractalParams - The render method receives parameters to control rendering
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