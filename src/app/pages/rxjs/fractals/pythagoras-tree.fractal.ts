import { FractalRenderer, FractalParams, FractalDescription } from '../models/fractal.interface';
import { AbstractFractal } from './fractal-base';

/**
 * Pythagoras Tree fractal renderer.
 */
export class PythagorasTreeFractal extends AbstractFractal {
  /** Unique identifier for the fractal type. */
  readonly id = 'pythagoras-tree';
  
  /** Human-readable display name. */
  readonly name = 'Pythagoras Tree';
  
  /** Maximum recursion depth. */
  readonly depth: number;

  /** Metadata including author and historical information. */
  readonly description: FractalDescription = {
    summary: 'The Pythagoras tree is a fractal composed of squares, based on the Pythagorean theorem. Starting with a square, two smaller squares are constructed on the sides of a right isosceles triangle, and this process repeats recursively for each new square.',
    author: 'Albert E. Bosman',
    authorBorn: 1901,
    authorDied: 1986,
    yearDiscovered: 1942,
    characteristic: 'With a 45-degree angle, the tree becomes bilaterally symmetric. The area relationship follows the Pythagorean theorem: the square of the hypotenuse equals the sum of squares of the other two sides.'
  };

  /**
   * Creates a new PythagorasTreeFractal instance.
   * @param depth Maximum recursion depth (default: 8).
   */
  constructor(depth: number = 8) {
    super();
    this.depth = depth;
  }

  /**
   * Renders the Pythagoras tree fractal on the canvas.
   * @param ctx Canvas 2D rendering context.
   * @param params Rendering parameters (centerX, centerY, size, rotation, hue, growth).
   */
  render(ctx: CanvasRenderingContext2D, params: FractalParams): void {
    const { centerX, centerY, size, hue, growth = 1 } = params;

    const baseSize = size * 0.7;
    
    const startX = centerX - baseSize / 2;
    const startY = centerY + centerY * 0.6;
    const startX2 = centerX + baseSize / 2;

    const effectiveDepth = Math.max(1, Math.floor(this.depth * growth));

    this.drawTree(ctx, startX, startY, startX2, startY, this.depth, hue, effectiveDepth);
  }

  /**
   * Recursively draws tree branches.
   * @param ctx Canvas 2D rendering context.
   * @param x1 Starting X coordinate.
   * @param y1 Starting Y coordinate.
   * @param x2 Ending X coordinate.
   * @param y2 Ending Y coordinate.
   * @param depth Current recursion depth.
   * @param hue Base hue color.
   * @param effectiveDepth Maximum depth to render.
   */
  private drawTree(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    depth: number,
    hue: number,
    effectiveDepth: number
  ): void {
    if (depth === 0) {
      return;
    }

    const dx = x2 - x1;
    const dy = y1 - y2;

    const x3 = x2 - dy;
    const y3 = y2 - dx;
    const x4 = x1 - dy;
    const y4 = y1 - dx;
    const x5 = x4 + (dx - dy) / 2;
    const y5 = y4 - (dx + dy) / 2;

    const currentHue = (hue + (this.depth - depth) * 15) % 360;
    const lightness = 30 + (this.depth - depth) * 5;

    ctx.strokeStyle = `hsl(${currentHue}, 65%, ${lightness}%)`;
    ctx.fillStyle = `hsla(${currentHue}, 60%, ${lightness}%, 0.15)`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = `hsla(${(currentHue + 30) % 360}, 55%, ${lightness + 10}%, 0.25)`;
    ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (depth <= effectiveDepth - 1) {
      return;
    }

    this.drawTree(ctx, x4, y4, x5, y5, depth - 1, hue, effectiveDepth);
    this.drawTree(ctx, x5, y5, x3, y3, depth - 1, hue, effectiveDepth);
  }
}