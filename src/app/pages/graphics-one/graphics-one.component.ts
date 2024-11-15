import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-graphics-one',
  templateUrl: './graphics-one.component.html',
  styles: []
})
export class GraphicsOneComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100]
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  public charts: any = {
    chart1: {
      labels: ['In the afternoon', 'At night', 'In the morning'],
      data:  [24, 30, 46],
      type: 'doughnut',
      legend: 'Preferred time of day to focus on something'
    },
    chart2: {
      labels: ['Male', 'Female', 'Other'],
      data:  [2000, 4500, 1500],
      type: 'doughnut',
      legend: 'Respondents'
    },
    chart3: {
      labels: ['Marvel', 'DC'],
      data:  [55, 45],
      type: 'doughnut',
      legend: 'Marvel or DC movies?'
    },
    chart4: {
      labels: ['Yes', 'No'],
      data:  [75, 25],
      type: 'doughnut',
      legend: 'Have you ever tasted Neapolitan Milanesa?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
