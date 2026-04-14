import { FractalService } from './fractal.service';
import { AbstractFractal } from '../fractals/fractal-base';

describe('FractalService', () => {
  let service: FractalService;

  beforeEach(() => {
    service = new FractalService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have fractalOptions', () => {
    expect(service.fractalOptions).toBeDefined();
    expect(service.fractalOptions.length).toBeGreaterThan(0);
  });

  it('should have default fractal as koch-snowflake', () => {
    const fractal = service.getFractal();
    expect(fractal.id).toBe('koch-snowflake');
  });

  it('should return fractal description', () => {
    const description = service.fractalDescription;
    
    expect(description).toBeDefined();
    expect(description.author).toBeDefined();
    expect(description.summary).toBeDefined();
  });

  it('should return current fractal id', () => {
    expect(service.currentFractalId).toBe('koch-snowflake');
  });

  it('should select fractal by id', () => {
    service.selectFractal('pythagoras-tree');
    
    expect(service.currentFractalId).toBe('pythagoras-tree');
    expect(service.getFractal().id).toBe('pythagoras-tree');
  });

  it('should update animation time', () => {
    service.updateAnimationTime(0.016);
    
    expect(service['animationTime']).toBeCloseTo(0.016, 2);
  });

  it('should compute parameters based on animation time and mouse position', () => {
    service.updateAnimationTime(0.016);
    const params = service.computeParams(0.5, 0.5);
    
    expect(params.centerX).toBe(300);
    expect(params.centerY).toBe(250);
    expect(params.size).toBeGreaterThan(0);
    expect(params.rotation).toBeDefined();
    expect(params.hue).toBeGreaterThanOrEqual(0);
    expect(params.hue).toBeLessThan(360);
    expect(params.growth).toBeDefined();
  });

  it('should compute growth based on mouse Y', () => {
    const paramsLow = service.computeParams(0, 0);
    const paramsHigh = service.computeParams(0, 1);
    
    expect(paramsLow.growth).toBeCloseTo(0.15, 2);
    expect(paramsHigh.growth).toBeCloseTo(1.0, 2);
  });

  it('should render fractal', () => {
    const mockCtx = {
      fillRect: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    service.updateAnimationTime(0.016);
    const params = service.computeParams(0.5, 0.5);
    
    expect(() => service.render(mockCtx, params)).not.toThrow();
  });

  it('should reset animation time', () => {
    service.updateAnimationTime(1.0);
    service.resetAnimationTime();
    
    expect(service['animationTime']).toBe(0);
  });
});