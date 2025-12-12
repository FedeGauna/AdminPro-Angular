import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-numericUpDown',
    templateUrl: './numericUpDown.component.html',
    styles: [],
    standalone: false
})
export class NumericUpDownComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() legend: string = 'Legend';
  @Input() progress: number = 50;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

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
