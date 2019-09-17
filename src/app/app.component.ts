import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'economy';

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        gridLines: { color: 'rgba(255,255,255,0.1)' },
        display: false
      }], yAxes: [{
        gridLines: { color: 'rgba(255,255,255,0.1)' },
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
  public barChartLabels: Label[] = ['2006'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartDataRenda: ChartDataSets[] = [
    { data: [65], label: 'Series A', backgroundColor: "green", hoverBackgroundColor: "green" }
  ];

  public barChartDataGasto: ChartDataSets[] = [
    { data: [65], label: 'Series A', backgroundColor: "blue", hoverBackgroundColor: "blue" }
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
