import { FractalRenderer, FractalParams, FractalDescription } from '../models/fractal.interface';

/**
 * Abstract base class for fractal implementations.
 */
export abstract class AbstractFractal implements FractalRenderer {
  /** Unique identifier for the fractal type. */
  abstract readonly id: string;

  /** Human-readable display name. */
  abstract readonly name: string;

  /** Maximum recursion depth. */
  abstract readonly depth: number;

  /** Metadata including author and historical information. */
  abstract readonly description: FractalDescription;

  /**
   * Renders the fractal on the given canvas context.
   * @param ctx Canvas 2D rendering context.
   * @param params Rendering parameters.
   */
  abstract render(ctx: CanvasRenderingContext2D, params: FractalParams): void;

  /**
   * Draws a line segment on the canvas.
   * @param ctx Canvas 2D rendering context.
   * @param x1 Starting X coordinate.
   * @param y1 Starting Y coordinate.
   * @param x2 Ending X coordinate.
   * @param y2 Ending Y coordinate.
   */
  protected drawLine(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}