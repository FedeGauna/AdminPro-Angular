import { Component, OnInit } from '@angular/core';
import { NumericUpDownComponent } from '../../components/numericUpDown/numericUpDown.component';

@Component({
    selector: 'app-progress',
    standalone: true,
    templateUrl: './progress.component.html',
    styles: [],
    imports: [NumericUpDownComponent]
})
export class ProgressComponent implements OnInit {

  progressBlue: number = 20;
  progressGreen: number = 30;

  get getProgressBlue() {
    return `${ this.progressBlue }%`;
  }
  get getProgressGreen() {
    return `${ this.progressGreen }%`;
  }

  constructor() { }

  ngOnInit() {
  }

}
