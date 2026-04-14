import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Interaction state containing normalized mouse position and mode.
 */
export interface InteractionState {
  /** Normalized mouse X position (0-1). */
  mouseX: number;
  /** Normalized mouse Y position (0-1). */
  mouseY: number;
  /** Whether the mouse is currently over the canvas. */
  isInteractiveMode: boolean;
}

/**
 * Service responsible for handling mouse interactions on the canvas.
 * Manages mouse move, enter, and leave events using RxJS.
 */
@Injectable({
  providedIn: 'root'
})
export class InteractionService implements OnDestroy {
  /** Subject for complete destruction cleanup. */
  private destroy$ = new Subject<void>();

  /** Current interaction state. */
  private state: InteractionState = {
    mouseX: 0,
    mouseY: 0,
    isInteractiveMode: false
  };

  /**
   * Gets the current interaction state.
   * @returns The current interaction state.
   */
  getState(): InteractionState {
    return { ...this.state };
  }

  /**
   * Sets up event listeners on a canvas element.
   * @param canvas The canvas element to attach listeners to.
   * @param onChange Callback when interaction state changes.
   */
  setupEventListeners(canvas: HTMLCanvasElement, onChange: (state: InteractionState) => void): void {
    fromEvent<MouseEvent>(canvas, 'mousemove').pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      const rect = canvas.getBoundingClientRect();
      this.state.mouseX = (event.clientX - rect.left) / rect.width;
      this.state.mouseY = (event.clientY - rect.top) / rect.height;
      onChange(this.getState());
    });

    fromEvent(canvas, 'mouseenter').pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.state.isInteractiveMode = true;
      onChange(this.getState());
    });

    fromEvent(canvas, 'mouseleave').pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.state.isInteractiveMode = false;
      onChange(this.getState());
    });
  }

  /**
   * Resets the interaction state to default values.
   */
  reset(): void {
    this.state = {
      mouseX: 0,
      mouseY: 0,
      isInteractiveMode: false
    };
  }

  /**
   * Lifecycle hook called before service destruction.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}