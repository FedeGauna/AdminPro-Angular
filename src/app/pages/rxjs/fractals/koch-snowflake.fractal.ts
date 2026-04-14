import { FractalParams } from '../models/fractal-params.interface';
import { FractalDescription } from '../models/fractal-description.interface';
import { AbstractFractal } from './fractal-base';

/**
 * Represents a 2D point for fractal calculations.
 */
interface Point {
  /** X coordinate. */
  x: number;
  /** Y coordinate. */
  y: number;
}

/**
 * Koch Snowflake fractal renderer.
 */
export class KochSnowflakeFractal extends AbstractFractal {
  /** Unique identifier for the fractal type. */
  readonly id = 'koch-snowflake';
  
  /** Human-readable display name. */
  readonly name = 'Koch Snowflake';
  
  /** Maximum recursion depth. */
  readonly depth: number;

  /** Metadata including author and historical information. */
  readonly description: FractalDescription = {
    summary: 'The Koch snowflake is a mathematical curve, also known as the Koch island, which is continuous and nowhere differentiable and starts as a line segment that gets infinitely more complex with each iteration.',
    author: 'Helge von Koch',
    authorBorn: 1870,
    authorDied: 1924,
    yearDiscovered: 1904,
    characteristic: 'Each iteration creates smaller triangular bumps, resulting in an infinitely long boundary with finite area.'
  };

  /**
   * Creates a new KochSnowflakeFractal instance.
   * @param depth Maximum recursion depth (default: 4). Higher values produce more detailed fractals.
   */
  constructor(depth: number = 4) {
    super();
    this.depth = depth;
  }

  /**
   * Renders the Koch snowflake fractal on the canvas.
   * @param ctx Canvas 2D rendering context.
   * @param params Rendering parameters (centerX, centerY, size, rotation, hue).
   */
  render(ctx: CanvasRenderingContext2D, params: FractalParams): void {
    const { centerX, centerY, size, rotation, hue } = params;

    const points: Point[] = [];
    const angleStep = Math.PI / 3;

    for (let i = 0; i < 6; i++) {
      const currentAngle = rotation + (i * angleStep);
      const x = centerX + size * Math.cos(currentAngle);
      const y = centerY + size * Math.sin(currentAngle);
      points.push({ x, y });
    }

    ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
    ctx.shadowBlur = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < 6; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 6];
      this.drawKochLine(ctx, p1, p2, this.depth);
    }

    ctx.strokeStyle = `hsl(${(hue + 60) % 360}, 80%, 60%)`;
    ctx.shadowColor = `hsl(${(hue + 60) % 360}, 100%, 50%)`;
    ctx.shadowBlur = 5;

    for (let i = 0; i < 6; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 6];
      this.drawKochLine(ctx, p1, p2, this.depth - 1);
    }
  }

  /**
   * Draws a Koch curve line segment.
   * @param ctx Canvas 2D rendering context.
   * @param p1 Starting point.
   * @param p2 Ending point.
   * @param depth Current recursion depth.
   */
  private drawKochLine(ctx: CanvasRenderingContext2D, p1: Point, p2: Point, depth: number): void {
    if (depth === 0) {
      this.drawLine(ctx, p1.x, p1.y, p2.x, p2.y);
      return;
    }

    const points = this.getKochPoints(p1, p2, depth);

    for (let i = 0; i < points.length - 1; i++) {
      this.drawLine(ctx, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    }
  }

  /**
   * Calculates the intermediate points for a Koch curve.
   * @param p1 Starting point.
   * @param p2 Ending point.
   * @param depth Current recursion depth.
   * @returns Array of points forming the Koch curve.
   */
  private getKochPoints(p1: Point, p2: Point, depth: number): Point[] {
    if (depth === 0) {
      return [p1, p2];
    }

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    const a: Point = { x: p1.x + dx / 3, y: p1.y + dy / 3 };
    const b: Point = { x: p1.x + dx * 2 / 3, y: p1.y + dy * 2 / 3 };

    const angle = Math.atan2(dy, dx) - Math.PI / 3;
    const len = Math.sqrt(dx * dx + dy * dy) / 3;

    const tip: Point = {
      x: a.x + len * Math.cos(angle),
      y: a.y + len * Math.sin(angle)
    };

    return [
      ...this.getKochPoints(p1, a, depth - 1).slice(0, -1),
      ...this.getKochPoints(a, tip, depth - 1).slice(0, -1),
      ...this.getKochPoints(tip, b, depth - 1).slice(0, -1),
      ...this.getKochPoints(b, p2, depth - 1)
    ];
  }
}
