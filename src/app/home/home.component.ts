import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        gridLines: { display: false },
        display: false
      }], yAxes: [{
        gridLines: { display: false },
        display: false
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    },
    legend: {
      display: false
    },
    events: []
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartPlugins = [pluginDataLabels];

  public barChartDataRenda: ChartDataSets[] = [
    { data: [65], backgroundColor: "green", hoverBackgroundColor: "green" }
  ];
  public barChartDataGasto: ChartDataSets[] = [
    { data: [34, 65], backgroundColor: "blue", hoverBackgroundColor: "blue" }
  ];

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartDataRenda[0].data = data;
    this.barChartDataGasto[0].data = data;
  }

}
