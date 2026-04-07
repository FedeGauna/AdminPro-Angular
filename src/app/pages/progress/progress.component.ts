import { Component, OnInit } from '@angular/core';
import { NumericUpDownComponent } from '../../components/numericUpDown/numericUpDown.component';

@Component({
    selector: 'app-progress',
    standalone: true,
    templateUrl: './progress.component.html',
    styles: [],
    imports: [NumericUpDownComponent]
})
/**
 * Displays interactive progress bars.
 */
export class ProgressComponent implements OnInit {

  progressBlue: number = 20;
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