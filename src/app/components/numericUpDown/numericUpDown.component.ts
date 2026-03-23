import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Component that displays a numeric up/down control for progress values.
 * Allows incrementing, decrementing, and direct input of progress values between 0 and 100.
 */
@Component({
    selector: 'app-numericUpDown',
    standalone: true,
    templateUrl: './numericUpDown.component.html',
    styles: [],
    imports: [FormsModule]
})
export class NumericUpDownComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  /** Label displayed for the progress control. */
  @Input() legend: string = 'Legend';
  /** Current progress value, constrained between 0 and 100. */
  @Input() progress: number = 50;

  /** Event emitted when the progress value changes. */
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Handles changes to the progress value from direct input.
   * Clamps the value between 0 and 100 and emits the result.
   * @param newValue The new progress value entered by the user.
   */
  onChanges( newValue: number ) {

     if ( newValue >= 100 ) {
       this.progress = 100;
     } else if ( newValue <= 0 ) {
       this.progress = 0;
     } else {
       this.progress = newValue;
    }

     this.txtProgress.nativeElement.value = this.progress;
     this.valueChange.emit( this.progress );
  }

  /**
   * Increments or decrements the progress value by the specified amount.
   * Clamps the result between 0 and 100 and focuses the input element.
   * @param value The amount to change the progress by (positive or negative).
   */
  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
    this.valueChange.emit( this.progress );
    this.txtProgress.nativeElement.focus();
  }

}
