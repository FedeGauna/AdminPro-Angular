import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RxjsComponent } from './rxjs.component';
import { CanvasRendererService } from './services/canvas-renderer.service';
import { InteractionService } from './services/interaction.service';
import { FractalService } from './services/fractal.service';
import { FRACTAL_OPTIONS } from './models/fractal-registry';
import { AbstractFractal } from './fractals/fractal-base';

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
  let canvasService: CanvasRendererService;
  let interactionService: InteractionService;
  let fractalService: FractalService;

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
      imports: [RxjsComponent, FormsModule],
      providers: [
        CanvasRendererService,
        InteractionService,
        FractalService
      ]
    }).compileComponents();

    canvasService = TestBed.inject(CanvasRendererService);
    interactionService = TestBed.inject(InteractionService);
    fractalService = TestBed.inject(FractalService);

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

  it('should initialize selectedFractalId as koch-snowflake', () => {
    expect(component.selectedFractalId).toBe('koch-snowflake');
  });

  it('should have fractalOptions populated from registry', () => {
    expect(component.fractalOptions).toBeDefined();
    expect(component.fractalOptions.length).toBe(FRACTAL_OPTIONS.length);
    expect(component.fractalOptions[0].id).toBe('koch-snowflake');
    expect(component.fractalOptions[1].id).toBe('pythagoras-tree');
  });

  it('should call ngOnDestroy on services', () => {
    const canvasDestroySpy = jest.spyOn(canvasService, 'ngOnDestroy');
    const interactionDestroySpy = jest.spyOn(interactionService, 'ngOnDestroy');

    component.ngOnDestroy();

    expect(canvasDestroySpy).toHaveBeenCalled();
    expect(interactionDestroySpy).toHaveBeenCalled();
  });

  it('should call initCanvas on canvas service during ngAfterViewInit', () => {
    const initCanvasSpy = jest.spyOn(canvasService, 'initCanvas');

    component.ngAfterViewInit();

    expect(initCanvasSpy).toHaveBeenCalledWith(mockCanvas);
  });

  it('should call setupEventListeners on interaction service during ngAfterViewInit', () => {
    const setupSpy = jest.spyOn(interactionService, 'setupEventListeners');

    component.ngAfterViewInit();

    expect(setupSpy).toHaveBeenCalledWith(mockCanvas, expect.any(Function));
  });

  it('should call startAnimation on canvas service during ngAfterViewInit', () => {
    const startSpy = jest.spyOn(canvasService, 'startAnimation');

    component.ngAfterViewInit();

    expect(startSpy).toHaveBeenCalled();
  });

  it('should set frame callback on canvas service', () => {
    const setCallbackSpy = jest.spyOn(canvasService, 'setFrameCallback');

    component.ngAfterViewInit();

    expect(setCallbackSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should change fractal when onFractalChange is called', () => {
    const initialFractalId = fractalService.getFractal().id;
    component.onFractalChange('pythagoras-tree');
    
    expect(component.selectedFractalId).toBe('pythagoras-tree');
    expect(fractalService.getFractal().id).not.toBe(initialFractalId);
  });

  it('should clear canvas when fractal changes', () => {
    const clearSpy = jest.spyOn(canvasService, 'clearCanvas');
    component.onFractalChange('pythagoras-tree');
    
    expect(clearSpy).toHaveBeenCalled();
  });

  it('should handle unknown fractal id without error', () => {
    expect(() => {
      component.onFractalChange('unknown-fractal');
    }).not.toThrow();
  });

  it('should provide fractalDescription from fractal service', () => {
    const description = component.fractalDescription;
    
    expect(description).toBeDefined();
    expect(description.summary).toBeDefined();
  });
});