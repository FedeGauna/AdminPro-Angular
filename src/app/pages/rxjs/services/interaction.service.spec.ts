import { InteractionService } from './interaction.service';

jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  fromEvent: jest.fn(() => {
    const mockObservable = {
      pipe: jest.fn(() => mockObservable),
      subscribe: jest.fn(() => ({ unsubscribe: jest.fn() }))
    };
    return mockObservable;
  })
}));

describe('InteractionService', () => {
  let service: InteractionService;
  let mockCanvas: HTMLCanvasElement;

  beforeEach(() => {
    service = new InteractionService();

    mockCanvas = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 0,
        top: 0,
        width: 600,
        height: 500
      })
    } as unknown as HTMLCanvasElement;
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default state', () => {
    const state = service.getState();
    
    expect(state.mouseX).toBe(0);
    expect(state.mouseY).toBe(0);
    expect(state.isInteractiveMode).toBe(false);
  });

  it('should set up event listeners', () => {
    const onChange = jest.fn();
    const fromEvent = require('rxjs').fromEvent;
    
    service.setupEventListeners(mockCanvas, onChange);
    
    expect(fromEvent).toHaveBeenCalledTimes(3);
    expect(fromEvent).toHaveBeenCalledWith(mockCanvas, 'mousemove');
    expect(fromEvent).toHaveBeenCalledWith(mockCanvas, 'mouseenter');
    expect(fromEvent).toHaveBeenCalledWith(mockCanvas, 'mouseleave');
  });

  it('should reset state', () => {
    service['state'].mouseX = 0.5;
    service['state'].mouseY = 0.5;
    service['state'].isInteractiveMode = true;
    
    service.reset();
    
    const state = service.getState();
    expect(state.mouseX).toBe(0);
    expect(state.mouseY).toBe(0);
    expect(state.isInteractiveMode).toBe(false);
  });

  it('should clean up on destroy', () => {
    service.ngOnDestroy();
    
    expect(service['destroy$'].isStopped).toBe(true);
  });
});