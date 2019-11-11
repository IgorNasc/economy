import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { GastoService } from 'src/app/services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  maiorValor: number = 0;
  barChartDataRenda: ChartDataSets[] = [
    { data: [0], backgroundColor: "transparent", hoverBackgroundColor: "transparent" },
    // { data: [this.rendaService.rendaTotal], backgroundColor: "#1a981a", hoverBackgroundColor: "#1a981a" },
    // { data: [this.maiorValor], backgroundColor: "transparent", hoverBackgroundColor: "transparent" }
  ];
  barChartDataGasto: Array<ChartDataSets> = [
    { data: [0], backgroundColor: "transparent", hoverBackgroundColor: "transparent" },
    // { data: [this.gastoService.gastoTotal], backgroundColor: "#d12f2f", hoverBackgroundColor: "#d12f2f" },
    // { data: [this.maiorValor], backgroundColor: "transparent", hoverBackgroundColor: "transparent" }
  ];
  private barChartOptions: ChartOptions = {
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
  private barChartType: ChartType = 'horizontalBar';
  private barChartPlugins = [pluginDataLabels];

  constructor(
    private gastoService: GastoService,
    private rendaService: RendaService) { }

  ngOnInit() {
    (async () => {
      this.delay(1000).then(
        (out) => {
          this.maiorValor = this.rendaService.rendaTotal > this.gastoService.gastoTotal ?
          this.rendaService.rendaTotal : this.gastoService.gastoTotal

          this.barChartDataGasto = [
            { data: [0], backgroundColor: "transparent", hoverBackgroundColor: "transparent" },
            { data: [this.gastoService.gastoTotal], backgroundColor: "#d12f2f", hoverBackgroundColor: "#d12f2f" },
            { data: [this.maiorValor], backgroundColor: "transparent", hoverBackgroundColor: "transparent" }
          ];

          this.barChartDataRenda = [
            { data: [0], backgroundColor: "transparent", hoverBackgroundColor: "transparent" },
            { data: [this.rendaService.rendaTotal], backgroundColor: "#1a981a", hoverBackgroundColor: "#1a981a" },
            { data: [this.maiorValor], backgroundColor: "transparent", hoverBackgroundColor: "transparent" }
          ];
        }
      );
    })();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
