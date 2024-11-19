import { Component } from "@angular/core";
import { ChartType, ChartData } from "chart.js";

@Component({
  selector: "app-graphics-one",
  templateUrl: "./graphics-one.component.html",
  styles: [],
})
export class GraphicsOneComponent {
  // Doughnut
  public doughnutChartLabels: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales",
  ];
  public doughnutChartData: ChartData<"doughnut"> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
      },
    ],
  };
  public doughnutChartType: ChartType = "doughnut";

  public charts: any = {
    chart1: {
      data: {
        labels: ["In the afternoon", "At night", "In the morning"],
        datasets: [
          {
            data: [24, 30, 46],
            backgroundcolor: ["#F8C7CC", "#81A684"],
            borderWidth: 0.5,
            borderColor: 'black', 
            cutout: '50%',
            radius: '70%'
          },
        ],
        options : {
        }
      },
      legend: "Preferred time of day to focus on something",
      type: "doughnut" as ChartType,
    },
    chart2: {
      data: {
        labels: ["Male", "Female", "Other"],
        datasets: [
          {
            data: [2000, 4500, 1500],
            backgroundColor: ["#6857E6", "#009FEE", "#F02059"],
            borderWidth: 0.5,
            borderColor: 'black', 
            cutout: '50%',
            radius: '70%'
          },
        ],
      },
      legend: "Respondents",
      type: "doughnut" as ChartType,
    },
    chart3: {
      data: {
        labels: ["Marvel", "DC"],
        datasets: [
          {
            data: [55, 45],
            backgroundColor: ["#384A59", "#BF9969"],
            borderWidth: 0.5,
            borderColor: 'black', 
            cutout: '50%',
            radius: '70%'
          },
        ],
      },
      legend: "Marvel or DC movies?",
      type: "doughnut" as ChartType,
    },
    chart4: {
      data: {
        labels: ["Yes", "No"],
        datasets: [
          {
            data: [75, 25],
            backgroundColor: ["#833B8C", "#D9AA52"],
            borderWidth: 0.5,
            borderColor: 'black', 
            cutout: '50%',
            radius: '70%'
          },
        ],
      },
      legend: "Have you ever tasted Neapolitan Milanesa?",
      type: "doughnut" as ChartType,
    },
  };
}
