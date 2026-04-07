import { Component, OnInit, Input } from "@angular/core";
import { ChartData, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

@Component({
    selector: "app-doughnut-chart",
    standalone: true,
    templateUrl: "./doughnutChart.component.html",
    styles: [],
    imports: [BaseChartDirective]
})
/**
 * Renders a doughnut chart using Chart.js.
 */
export class DoughnutChartComponent implements OnInit {
  /**
   * Gets or sets the chart labels.
   */
  @Input() labels: string[] = [
    "Fruit Jam",
    "Cheese",
    "Dulce de leche and butter",
    "I don't eat toast",
  ];

  /**
   * Sets the chart data.
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
   * Sets the chart type.
   */
  @Input() type: ChartType = "doughnut";

  /**
   * Sets the chart legend.
   */
  @Input() legend: string = "At breakfast, toast is eaten with";

  /**
   * Sets the chart configuration options.
   */
  @Input() options: any;

  /**
   * Initializes the DoughnutChartComponent.
   */
  constructor() {}

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {}
}