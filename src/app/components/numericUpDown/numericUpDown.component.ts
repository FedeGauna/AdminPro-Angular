import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Provides a numeric up/down control for progress values.
 */
@Component({
    selector: 'app-numericUpDown',
    standalone: true,
    templateUrl: './numericUpDown.component.html',
    styles: [],
    imports: [FormsModule]
})
export class NumericUpDownComponent implements OnInit {

  /** Reference to the progress input element. */
  @ViewChild('txtProgress') txtProgress: ElementRef;

  /**
   * Gets or sets the control label.
   */
  @Input() legend: string = 'Legend';
  /**
   * Gets or sets the progress value (0-100).
   */
  @Input() progress: number = 50;

  /**
   * Emits when the progress value changes.
   */
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  /**
   * Initializes the NumericUpDownComponent.
   */
  constructor() {
  }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

  /**
   * Handles changes to the progress value from direct input.
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
   * @param value The amount to change the progress by.
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