import { Component, OnInit } from '@angular/core';
import { NumericUpDownComponent } from '../../components/numericUpDown/numericUpDown.component';

/**
 * Component displaying interactive progress bars.
 * Uses NumericUpDownComponent for controlling progress values.
 */
@Component({
    selector: 'app-progress',
    standalone: true,
    templateUrl: './progress.component.html',
    styles: [],
    imports: [NumericUpDownComponent]
})
export class ProgressComponent implements OnInit {

  /** Progress value for the blue progress bar. */
  progressBlue: number = 20;
  /** Progress value for the green progress bar. */
  progressGreen: number = 30;

  /**
   * Gets the formatted progress value for the blue progress bar.
   * @returns The progress value as a percentage string.
   */
  get getProgressBlue() {
    return `${ this.progressBlue }%`;
  }
  /**
   * Gets the formatted progress value for the green progress bar.
   * @returns The progress value as a percentage string.
   */
  get getProgressGreen() {
    return `${ this.progressGreen }%`;
  }

  constructor() { }

  ngOnInit() {
  }

}
