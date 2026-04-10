import { Component, OnInit } from '@angular/core';
import { NumericUpDownComponent } from '../../components/numericUpDown/numericUpDown.component';

/**
 * Displays interactive progress bars.
 */
@Component({
    selector: 'app-progress',
    standalone: true,
    templateUrl: './progress.component.html',
    styles: [],
    imports: [NumericUpDownComponent]
})
export class ProgressComponent implements OnInit {

  /** Progress value for the blue progress bar (0-100). */
  progressBlue: number = 20;
  /** Progress value for the green progress bar (0-100). */
  progressGreen: number = 30;

  /**
   * Gets the progress value for the blue bar.
   * @returns The progress as a percentage string.
   */
  get getProgressBlue() {
    return `${ this.progressBlue }%`;
  }

  /**
   * Gets the progress value for the green bar.
   * @returns The progress as a percentage string.
   */
  get getProgressGreen() {
    return `${ this.progressGreen }%`;
  }

  /**
   * Initializes the ProgressComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

}