import { KochSnowflakeFractal } from './koch-snowflake.fractal';
import { FractalParams } from '../models/fractal.interface';

describe('KochSnowflakeFractal', () => {
  let fractal: KochSnowflakeFractal;
  let mockCtx: CanvasRenderingContext2D;

  const defaultParams: FractalParams = {
    centerX: 300,
    centerY: 250,
    size: 100,
    rotation: 0,
    hue: 180
  };

  beforeEach(() => {
    mockCtx = {
      fillRect: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      shadowColor: '',
      shadowBlur: 0,
      lineCap: 'round',
      lineJoin: 'round',
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      getContext: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    fractal = new KochSnowflakeFractal(4);
  });

  it('should create with default depth of 4', () => {
    expect(fractal.depth).toBe(4);
  });

  it('should create with custom depth', () => {
    const customFractal = new KochSnowflakeFractal(5);
    expect(customFractal.depth).toBe(5);
  });

  it('should have correct id', () => {
    expect(fractal.id).toBe('koch-snowflake');
  });

  it('should have correct name', () => {
    expect(fractal.name).toBe('Koch Snowflake');
  });

  it('should have correct depth value', () => {
    expect(fractal.depth).toBe(4);
  });

  it('should render without errors', () => {
    expect(() => fractal.render(mockCtx, defaultParams)).not.toThrow();
  });

  it('should call stroke methods on context', () => {
    fractal.render(mockCtx, defaultParams);

    expect(mockCtx.strokeStyle).toBeDefined();
    expect(mockCtx.lineWidth).toBe(1.5);
    expect(mockCtx.lineCap).toBe('round');
    expect(mockCtx.lineJoin).toBe('round');
  });

  it('should return 2 points at depth 0', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 100, y: 100 };

    const points = (fractal as unknown as { getKochPoints: (p1: { x: number; y: number }, p2: { x: number; y: number }, depth: number) => { x: number; y: number }[] }).getKochPoints(p1, p2, 0);

    expect(points.length).toBe(2);
    expect(points[0]).toEqual(p1);
    expect(points[1]).toEqual(p2);
  });

  it('should handle different parameters', () => {
    const params: FractalParams = {
      centerX: 100,
      centerY: 100,
      size: 50,
      rotation: Math.PI / 4,
      hue: 270
    };

    expect(() => fractal.render(mockCtx, params)).not.toThrow();
  });
});
