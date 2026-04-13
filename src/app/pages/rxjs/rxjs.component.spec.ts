import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsComponent } from './rxjs.component';
import { AbstractFractal } from './fractals/fractal-base';

// Mock rxjs module
jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  fromEvent: jest.fn(() => ({
    pipe: () => ({
      subscribe: jest.fn(() => ({
        unsubscribe: jest.fn()
      }))
    })
  })),
  animationFrames: jest.fn(() => ({
    pipe: () => ({
      subscribe: jest.fn(() => ({
        unsubscribe: jest.fn()
      }))
    })
  }))
}));

describe('RxjsComponent', () => {
  let component: RxjsComponent;
  let fixture: ComponentFixture<RxjsComponent>;
  let mockCanvas: HTMLCanvasElement;
  let mockCtx: CanvasRenderingContext2D;

  class MockFractal extends AbstractFractal {
    readonly id = 'mock';
    readonly name = 'Mock';
    readonly depth = 1;
    readonly description = {
      summary: 'Mock fractal for testing',
      author: 'Test',
      authorBorn: 2000,
      yearDiscovered: 2024,
      characteristic: 'Test characteristic'
    };

    render(): void {}
  }

  beforeEach(async () => {
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
      closePath: jest.fn(),
      fill: jest.fn(),
      stroke: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      strokeRect: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    mockCanvas = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 0,
        top: 0,
        width: 600,
        height: 500
      }),
      getContext: jest.fn().mockReturnValue(mockCtx)
    } as unknown as HTMLCanvasElement;

    await TestBed.configureTestingModule({
      imports: [RxjsComponent],
      providers: [
        { provide: AbstractFractal, useClass: MockFractal }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsComponent);
    component = fixture.componentInstance;
    
    Object.defineProperty(component, 'canvasRef', {
      writable: true,
      value: { nativeElement: mockCanvas }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isInteractiveMode as false', () => {
    expect(component.isInteractiveMode).toBe(false);
  });

  it('should set interactive mode on mouse enter', () => {
    component.onMouseEnter();
    expect(component.isInteractiveMode).toBe(true);
  });

  it('should unset interactive mode on mouse leave', () => {
    component.isInteractiveMode = true;
    component.onMouseLeave();
    expect(component.isInteractiveMode).toBe(false);
  });

  it('should update mouse position on mouse move', () => {
    const mockEvent = {
      clientX: 300,
      clientY: 250
    } as MouseEvent;

    component.onMouseMove(mockEvent);

    expect(component['mouseX']).toBe(0.5);
    expect(component['mouseY']).toBe(0.5);
  });

  it('should clean up subscriptions on destroy', () => {
    component.ngOnDestroy();
    expect(component.isInteractiveMode).toBe(false);
  });

  it('should render fractal when draw is called', () => {
    component['ctx'] = mockCtx;
    component['mouseX'] = 0.5;
    component['mouseY'] = 0.5;
    component['animationTime'] = 0;

    component['draw']();

    expect(mockCtx.fillRect).toHaveBeenCalled();
  });

  it('should not render when ctx is not initialized', () => {
    component['ctx'] = null as unknown as CanvasRenderingContext2D;
    component['draw']();
    expect(mockCtx.fillRect).not.toHaveBeenCalled();
  });

  it('should call initCanvas, setupEventListeners, and startAnimation on ngAfterViewInit', () => {
    const initSpy = jest.spyOn(component as any, 'initCanvas');
    const setupSpy = jest.spyOn(component as any, 'setupEventListeners');
    const startSpy = jest.spyOn(component as any, 'startAnimation');

    component.ngAfterViewInit();

    expect(initSpy).toHaveBeenCalled();
    expect(setupSpy).toHaveBeenCalled();
    expect(startSpy).toHaveBeenCalled();
  });

  it('should initialize canvas context in initCanvas', () => {
    component.ngAfterViewInit();
    expect(component['ctx']).toBeDefined();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
