import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animationFrames } from 'rxjs';

/**
 * Service responsible for canvas initialization and animation management.
 * Handles the canvas context setup and the animation loop using RxJS.
 */
@Injectable({
  providedIn: 'root'
})
export class CanvasRendererService implements OnDestroy {
  /** Canvas 2D rendering context. */
  private ctx!: CanvasRenderingContext2D;

  /** Subject for complete destruction cleanup. */
  private destroy$ = new Subject<void>();

  /** Active animation subscription. */
  private animationSubscription: any;

  /** Canvas width in pixels. */
  readonly CANVAS_WIDTH: number = 600;

  /** Canvas height in pixels. */
  readonly CANVAS_HEIGHT: number = 500;

  /**
   * Callback function for each animation frame.
   */
  private frameCallback: (() => void) | null = null;

  /**
   * Initializes the canvas context.
   * @param canvas The canvas element to initialize.
   */
  initCanvas(canvas: HTMLCanvasElement): void {
    this.ctx = canvas.getContext('2d')!;
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  /**
   * Gets the canvas rendering context.
   * @returns The 2D rendering context.
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * Clears the canvas with the background color.
   */
  clearCanvas(): void {
    if (!this.ctx) return;
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  /**
   * Applies a semi-transparent overlay for trail effect.
   */
  applyTrailEffect(): void {
    if (!this.ctx) return;
    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  /**
   * Sets the callback function to be called on each animation frame.
   * @param callback Function to call on each frame.
   */
  setFrameCallback(callback: () => void): void {
    this.frameCallback = callback;
  }

  /**
   * Starts the animation loop using RxJS animationFrames.
   */
  startAnimation(): void {
    this.animationSubscription = animationFrames().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.frameCallback) {
        this.frameCallback();
      }
    });
  }

  /**
   * Stops the animation loop.
   */
  stopAnimation(): void {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
      this.animationSubscription = null;
    }
  }

  /**
   * Lifecycle hook called before service destruction.
   */
  ngOnDestroy(): void {
    this.stopAnimation();
    this.destroy$.next();
    this.destroy$.complete();
  }
}