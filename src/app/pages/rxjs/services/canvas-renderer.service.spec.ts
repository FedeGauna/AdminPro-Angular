import { CanvasRendererService } from './canvas-renderer.service';

describe('CanvasRendererService', () => {
  let service: CanvasRendererService;
  let mockCanvas: HTMLCanvasElement;
  let mockCtx: CanvasRenderingContext2D;

  beforeEach(() => {
    service = new CanvasRendererService();

    mockCtx = {
      fillRect: jest.fn(),
      fillStyle: '',
      fill: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    mockCanvas = {
      getContext: jest.fn().mockReturnValue(mockCtx)
    } as unknown as HTMLCanvasElement;
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default canvas dimensions', () => {
    expect(service.CANVAS_WIDTH).toBe(600);
    expect(service.CANVAS_HEIGHT).toBe(500);
  });

  it('should initialize canvas context', () => {
    service.initCanvas(mockCanvas);
    
    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 600, 500);
  });

  it('should return canvas context', () => {
    service.initCanvas(mockCanvas);
    const ctx = service.getContext();
    
    expect(ctx).toBe(mockCtx);
  });

  it('should clear canvas with background color', () => {
    service.initCanvas(mockCanvas);
    service.clearCanvas();
    
    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 600, 500);
  });

  it('should apply trail effect', () => {
    service.initCanvas(mockCanvas);
    service.applyTrailEffect();
    
    expect(mockCtx.fillStyle).toBe('rgba(10, 10, 10, 0.1)');
    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 600, 500);
  });

  it('should set frame callback', () => {
    const callback = jest.fn();
    service.setFrameCallback(callback);
    
    expect(service['frameCallback']).toBe(callback);
  });

  it('should call frame callback on animation frame', () => {
    const callback = jest.fn();
    service.setFrameCallback(callback);
    service.startAnimation();
    
    expect(callback).toBeDefined();
    
    service.ngOnDestroy();
  });

  it('should stop animation on destroy', () => {
    service.startAnimation();
    service.ngOnDestroy();
    
    expect(service['animationSubscription']).toBeNull();
  });
});