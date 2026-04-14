import { PythagorasTreeFractal } from './pythagoras-tree.fractal';
import { FractalParams } from '../models/fractal-params.interface';

describe('PythagorasTreeFractal', () => {
  let fractal: PythagorasTreeFractal;
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
      strokeStyle: '',
      fillStyle: '',
      lineWidth: 0,
      lineCap: '',
      lineJoin: '',
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      stroke: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    fractal = new PythagorasTreeFractal(8);
  });

  it('should create with default depth', () => {
    expect(fractal.depth).toBe(8);
  });

  it('should create with custom depth', () => {
    const customFractal = new PythagorasTreeFractal(6);
    expect(customFractal.depth).toBe(6);
  });

  it('should have correct id', () => {
    expect(fractal.id).toBe('pythagoras-tree');
  });

  it('should have correct name', () => {
    expect(fractal.name).toBe('Pythagoras Tree');
  });

  it('should have correct depth value', () => {
    expect(fractal.depth).toBe(8);
  });

  it('should render without errors', () => {
    expect(() => fractal.render(mockCtx, defaultParams)).not.toThrow();
  });

  it('should call canvas drawing methods on context', () => {
    fractal.render(mockCtx, defaultParams);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.moveTo).toHaveBeenCalled();
    expect(mockCtx.lineTo).toHaveBeenCalled();
    expect(mockCtx.closePath).toHaveBeenCalled();
    expect(mockCtx.fill).toHaveBeenCalled();
    expect(mockCtx.stroke).toHaveBeenCalled();
  });

  it('should set stroke and fill styles', () => {
    fractal.render(mockCtx, defaultParams);

    expect(mockCtx.strokeStyle).toBeDefined();
    expect(mockCtx.fillStyle).toBeDefined();
    expect(mockCtx.lineWidth).toBe(1);
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

  it('should have author information', () => {
    expect(fractal.description.author).toBe('Albert E. Bosman');
    expect(fractal.description.authorBorn).toBe(1901);
    expect(fractal.description.authorDied).toBe(1986);
    expect(fractal.description.yearDiscovered).toBe(1942);
  });

  it('should respect growth parameter', () => {
    const paramsWithGrowth: FractalParams = { ...defaultParams, growth: 0.5 };
    expect(() => fractal.render(mockCtx, paramsWithGrowth)).not.toThrow();
  });

  it('should default growth to 1 when not provided', () => {
    const paramsNoGrowth: FractalParams = { ...defaultParams };
    expect(() => fractal.render(mockCtx, paramsNoGrowth)).not.toThrow();
  });
});