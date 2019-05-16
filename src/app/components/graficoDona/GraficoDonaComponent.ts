import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
    selector: 'app-grafico-dona',
    templateUrl: './graficoDona.component.html',
    styles: []
})
export class GraficoDonaComponent implements OnInit {

    @Input() labels: Label[] = ['Con Frijoles', 'Con Natilla', 'Con tocino'];
    @Input() data: MultiDataSet = [[24, 30, 46]];
    @Input() type: ChartType = 'doughnut';
    @Input() leyenda: string =  'El pan se come con';


    constructor() { }
    ngOnInit() {
    }
}
