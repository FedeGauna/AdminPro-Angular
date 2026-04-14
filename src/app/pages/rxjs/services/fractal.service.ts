import { Injectable } from '@angular/core';
import { FractalParams } from '../models/fractal-params.interface';
import { AbstractFractal } from '../fractals/fractal-base';
import { FRACTAL_OPTIONS, FractalOption, getDefaultFractalOption, findFractalById } from '../models/fractal-registry';

/**
 * Service responsible for fractal management, selection, parameter computation, and rendering.
 * This service encapsulates all fractal-related logic including switching between fractal types,
 * computing rendering parameters based on animation time and mouse interaction, and rendering.
 */
@Injectable({
  providedIn: 'root'
})
export class FractalService {
  /** Available fractal options for the selector. */
  readonly fractalOptions: FractalOption[] = FRACTAL_OPTIONS;

  /** Current fractal renderer instance. */
  private fractal: AbstractFractal;

  /** Currently selected fractal ID. */
  private selectedFractalId: string = 'koch-snowflake';

  /** Animation time accumulator for smooth transitions. */
  private animationTime: number = 0;

  /** Canvas width in pixels. */
  readonly CANVAS_WIDTH: number = 600;

  /** Canvas height in pixels. */
  readonly CANVAS_HEIGHT: number = 500;

  /**
   * Creates a new FractalService instance.
   */
  constructor() {
    const defaultFractal = getDefaultFractalOption();
    this.fractal = defaultFractal.factory();
    this.selectedFractalId = defaultFractal.id;
  }

  /**
   * Gets the current fractal renderer instance.
   * @returns The current AbstractFractal instance.
   */
  getFractal(): AbstractFractal {
    return this.fractal;
  }

  /**
   * Gets the fractal description for display.
   * @returns The FractalDescription object.
   */
  get fractalDescription() {
    return this.fractal.description;
  }

  /**
   * Gets the currently selected fractal ID.
   * @returns The selected fractal ID.
   */
  get currentFractalId(): string {
    return this.selectedFractalId;
  }

  /**
   * Handles fractal selection change.
   * @param fractalId The ID of the selected fractal.
   */
  selectFractal(fractalId: string): void {
    this.selectedFractalId = fractalId;
    const option = findFractalById(fractalId);
    if (option) {
      this.fractal = option.factory();
    }
  }

  /**
   * Updates the animation time.
   * Should be called on each animation frame.
   * @param deltaTime Time increment in seconds.
   */
  updateAnimationTime(deltaTime: number): void {
    this.animationTime += deltaTime;
  }

  /**
   * Computes the fractal parameters based on animation time and interaction state.
   * @param mouseX Normalized mouse X position (0-1).
   * @param mouseY Normalized mouse Y position (0-1).
   * @returns Computed FractalParams.
   */
  computeParams(mouseX: number, mouseY: number): FractalParams {
    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const baseRotation = this.animationTime * 0.3;
    const mouseRotation = mouseX * Math.PI * 0.5;
    const rotation = baseRotation + mouseRotation;

    const baseScale = 1 + Math.sin(this.animationTime * 0.5) * 0.2;
    const mouseScale = 0.5 + mouseY * 1.5;
    const scale = baseScale * mouseScale * 100;

    const baseHue = (this.animationTime * 30) % 360;
    const mouseHue = mouseX * 180;
    const hue = (baseHue + mouseHue) % 360;

    const growth = 0.15 + mouseY * 0.85;

    return {
      centerX,
      centerY,
      size: scale,
      rotation,
      hue,
      growth
    };
  }

  /**
   * Renders the current fractal with the given parameters.
   * @param ctx Canvas 2D rendering context.
   * @param params Rendering parameters.
   */
  render(ctx: CanvasRenderingContext2D, params: FractalParams): void {
    this.fractal.render(ctx, params);
  }

  /**
   * Resets the animation time to zero.
   */
  resetAnimationTime(): void {
    this.animationTime = 0;
  }
}