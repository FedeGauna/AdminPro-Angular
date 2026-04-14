import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animationFrames } from 'rxjs';

import { FractalParams } from './models/fractal.interface';
import { AbstractFractal } from './fractals/fractal-base';
import { FRACTAL_OPTIONS, FractalOption, getDefaultFractalOption } from './models/fractal-registry';

/**
 * RxJS Component demonstrating reactive programming with interactive fractal visualization.
 */
@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Reference to the canvas element for fractal rendering.
   */
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  /**
   * Canvas 2D rendering context.
   */
  private ctx!: CanvasRenderingContext2D;

  /**
   * Active subscriptions for cleanup on component destruction.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Subject for complete destruction cleanup.
   */
  private destroy$ = new Subject<void>();

  /**
   * Indicates if mouse is currently over the canvas.
   */
  isInteractiveMode: boolean = false;

  /**
   * Normalized mouse X position (0-1).
   */
  private mouseX: number = 0;

  /**
   * Normalized mouse Y position (0-1).
   */
  private mouseY: number = 0;

  /**
   * Animation time accumulator for smooth transitions.
   */
  private animationTime: number = 0;

  /**
   * Canvas width in pixels.
   */
  private readonly CANVAS_WIDTH: number = 600;

  /**
   * Canvas height in pixels.
   */
  private readonly CANVAS_HEIGHT: number = 500;

  /**
   * Current fractal renderer instance.
   */
  fractal: AbstractFractal;

  /**
   * Available fractal options for the selector.
   */
  fractalOptions: FractalOption[] = FRACTAL_OPTIONS;

  /**
   * Currently selected fractal ID.
   */
  selectedFractalId: string = 'koch-snowflake';

  /**
   * Creates an instance of RxjsComponent.
   */
  constructor() {
    const defaultFractal = getDefaultFractalOption();
    this.fractal = defaultFractal.factory();
    this.selectedFractalId = defaultFractal.id;
  }

  /**
   * Gets the fractal description for display.
   */
  get fractalDescription() {
    return this.fractal.description;
  }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Lifecycle hook called after component view initialization.
   */
  ngAfterViewInit(): void {
    this.initCanvas();
    this.setupEventListeners();
    this.startAnimation();
  }

  /**
   * Lifecycle hook called before component destruction.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Initializes the canvas context.
   */
  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  /**
   * Sets up RxJS event listeners for mouse interactions.
   */
  private setupEventListeners(): void {
    const canvas = this.canvasRef.nativeElement;

    const mouseMoveSub = fromEvent<MouseEvent>(canvas, 'mousemove').pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (event.clientX - rect.left) / rect.width;
      this.mouseY = (event.clientY - rect.top) / rect.height;
    });
    this.subscriptions.push(mouseMoveSub);

    const mouseEnterSub = fromEvent(canvas, 'mouseenter').pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isInteractiveMode = true;
    });
    this.subscriptions.push(mouseEnterSub);

    const mouseLeaveSub = fromEvent(canvas, 'mouseleave').pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isInteractiveMode = false;
    });
    this.subscriptions.push(mouseLeaveSub);
  }

  /**
   * Starts the animation loop using RxJS animationFrames.
   */
  private startAnimation(): void {
    const animationSub = animationFrames().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.animationTime += 0.016;
      this.draw();
    });
    this.subscriptions.push(animationSub);
  }

  /**
   * Handles fractal selection change.
   * @param fractalId The ID of the selected fractal.
   */
  onFractalChange(fractalId: string): void {
    this.selectedFractalId = fractalId;
    const option = FRACTAL_OPTIONS.find(f => f.id === fractalId);
    if (option) {
      this.fractal = option.factory();
      this.initCanvas();
    }
  }

  /**
   * Handles mouse move event on canvas.
   * @param event Mouse event containing cursor position.
   */
  onMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.mouseX = (event.clientX - rect.left) / rect.width;
    this.mouseY = (event.clientY - rect.top) / rect.height;
  }

  /**
   * Handles mouse enter event on canvas.
   */
  onMouseEnter(): void {
    this.isInteractiveMode = true;
  }

  /**
   * Handles mouse leave event on canvas.
   */
  onMouseLeave(): void {
    this.isInteractiveMode = false;
  }

  /**
   * Main draw loop that renders the fractal frame by frame.
   */
  private draw(): void {
    if (!this.ctx) return;

    this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const baseRotation = this.animationTime * 0.3;
    const mouseRotation = this.mouseX * Math.PI * 0.5;
    const rotation = baseRotation + mouseRotation;

    const baseScale = 1 + Math.sin(this.animationTime * 0.5) * 0.2;
    const mouseScale = 0.5 + this.mouseY * 1.5;
    const scale = baseScale * mouseScale * 100;

    const baseHue = (this.animationTime * 30) % 360;
    const mouseHue = this.mouseX * 180;
    const hue = (baseHue + mouseHue) % 360;

    const growth = 0.15 + this.mouseY * 0.85;

    const params: FractalParams = {
      centerX,
      centerY,
      size: scale,
      rotation,
      hue,
      growth
    };

    this.fractal.render(this.ctx, params);
  }
}
