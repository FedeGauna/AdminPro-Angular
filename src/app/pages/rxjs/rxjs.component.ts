import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CanvasRendererService } from './services/canvas-renderer.service';
import { InteractionService, InteractionState } from './services/interaction.service';
import { FractalService } from './services/fractal.service';

/**
 * RxJS Component demonstrating reactive programming with interactive fractal visualization.
 * Uses separate services for canvas rendering, interaction handling, and fractal management.
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
   * Indicates if mouse is currently over the canvas.
   */
  isInteractiveMode: boolean = false;

  /**
   * Available fractal options for the selector.
   */
  fractalOptions = this.fractalService.fractalOptions;

  /**
   * Currently selected fractal ID.
   */
  selectedFractalId: string;

  /**
   * Creates an instance of RxjsComponent.
   * @param canvasService Service for canvas initialization and animation.
   * @param interactionService Service for mouse interaction handling.
   * @param fractalService Service for fractal management and rendering.
   */
  constructor(
    private canvasService: CanvasRendererService,
    private interactionService: InteractionService,
    private fractalService: FractalService
  ) {
    this.selectedFractalId = this.fractalService.currentFractalId;
  }

  /**
   * Gets the fractal description for display.
   */
  get fractalDescription() {
    return this.fractalService.fractalDescription;
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
    this.canvasService.ngOnDestroy();
    this.interactionService.ngOnDestroy();
  }

  /**
   * Initializes the canvas context using the canvas service.
   */
  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.canvasService.initCanvas(canvas);
  }

  /**
   * Sets up event listeners using the interaction service.
   */
  private setupEventListeners(): void {
    const canvas = this.canvasRef.nativeElement;
    this.interactionService.setupEventListeners(canvas, (state: InteractionState) => {
      this.isInteractiveMode = state.isInteractiveMode;
    });
  }

  /**
   * Starts the animation loop using the canvas service.
   */
  private startAnimation(): void {
    this.canvasService.setFrameCallback(() => this.draw());
    this.canvasService.startAnimation();
  }

  /**
   * Handles fractal selection change.
   * @param fractalId The ID of the selected fractal.
   */
  onFractalChange(fractalId: string): void {
    this.selectedFractalId = fractalId;
    this.fractalService.selectFractal(fractalId);
    this.canvasService.clearCanvas();
  }

  /**
   * Main draw loop that renders the fractal frame by frame.
   */
  private draw(): void {
    const interactionState = this.interactionService.getState();

    this.canvasService.applyTrailEffect();

    this.fractalService.updateAnimationTime(0.016);
    const params = this.fractalService.computeParams(
      interactionState.mouseX,
      interactionState.mouseY
    );

    const ctx = this.canvasService.getContext();
    this.fractalService.render(ctx, params);
  }
}