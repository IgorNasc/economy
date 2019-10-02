import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chart.js';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Doughnut
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    legend: {
      display: false
    }
  };

  public doughnutChartLabels: Label[] = ['Mercado', 'Saúde', 'Transporte', 'Bar', 'Serviços', 'Contas', 'Outros'];
  public doughnutChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 0, 0, 0], backgroundColor: ['#1aa81a', '#b71b1b', '#c885b9', 'purple'], hoverBackgroundColor: ['#1aa81a', '#b71b1b', '#c885b9', 'purple'] }
  ];
  public doughnutChartType: ChartType = 'doughnut';


  // Bar
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Mercado', 'Saúde', 'Transporte', 'Bar', 'Serviços', 'Contas', 'Outros'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 0, 0, 0], backgroundColor: ['#1aa81a', '#b71b1b', '#c885b9', 'purple'], hoverBackgroundColor: ['#1aa81a', '#b71b1b', '#c885b9', 'purple'] }
  ];

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
    this.barChartData[0].data = data;
  }

}
