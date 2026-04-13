import { AbstractFractal } from './fractal-base';

class TestFractal extends AbstractFractal {
  readonly id = 'test';
  readonly name = 'Test';
  readonly depth = 1;
  readonly description = {
    summary: 'Test fractal',
    author: 'Test',
    authorBorn: 2000,
    yearDiscovered: 2024,
    characteristic: 'Test'
  };

  render(): void {}
}

describe('AbstractFractal', () => {
  let fractal: TestFractal;
  let mockCtx: CanvasRenderingContext2D;

  beforeEach(() => {
    mockCtx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    fractal = new TestFractal();
  });

  it('should have drawLine method', () => {
    expect(fractal['drawLine']).toBeDefined();
    expect(typeof fractal['drawLine']).toBe('function');
  });

  it('should call ctx methods in drawLine', () => {
    fractal['drawLine'](mockCtx, 0, 0, 100, 100);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(100, 100);
    expect(mockCtx.stroke).toHaveBeenCalled();
  });
});
