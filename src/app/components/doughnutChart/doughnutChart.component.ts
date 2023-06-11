import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnutChart.component.html',
    styles: []
})
export class DoughnutChartComponent implements OnInit {

    @Input() labels: Label[] = ['Fruit Jam', 'Cheese', 'Dulce de leche and butter', 'I don\'t eat toast'];
    @Input() data: MultiDataSet = [[24, 25, 46, 5]];
    @Input() type: ChartType = 'doughnut';
    @Input() legend: string =  'At breakfast, toast is eaten with';


    constructor() { }
    ngOnInit() {
    }
}
