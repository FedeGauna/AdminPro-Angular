import { Component, OnInit, Input } from "@angular/core";
import { ChartData, ChartType } from "chart.js";
import { NgChartsModule } from "ng2-charts";

@Component({
    selector: "app-doughnut-chart",
    standalone: true,
    templateUrl: "./doughnutChart.component.html",
    styles: [],
    imports: [NgChartsModule]
})
/**
 * Component responsible for rendering a doughnut chart.
 * Displays data visualization using Chart.js.
 */
export class DoughnutChartComponent implements OnInit {
  /**
   * Labels for the doughnut chart.
   */
  @Input() labels: string[] = [
    "Fruit Jam",
    "Cheese",
    "Dulce de leche and butter",
    "I don't eat toast",
  ];

  /**
   * Data for the doughnut chart.
   */
  @Input() data: ChartData<"doughnut"> = {
    labels: this.labels,
    datasets: [
      {
        data: [24, 25, 46, 5],
      },
    ],
  };

  /**
   * Type of the chart, defaulting to "doughnut".
   */
  @Input() type: ChartType = "doughnut";

  /**
   * Legend text for the chart.
   */
  @Input() legend: string = "At breakfast, toast is eaten with";

  /**
   * Configuration options for the chart.
   */
  @Input() options: any;

  /**
   * Initializes the DoughnutChartComponent.
   */
  constructor() {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {}
}
