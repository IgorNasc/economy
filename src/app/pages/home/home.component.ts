import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { GastoService } from 'src/app/services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

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
  private month: number = 0;

  constructor(
    private gastoService: GastoService,
    private rendaService: RendaService,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.asyncLoadGrath();
  }

  ngDoCheck() {
    if (this.headerService.getMonth() != this.month) {
      this.asyncLoadGrath();
      this.month = this.headerService.getMonth();
    }
  }

  async asyncLoadGrath() {
    new Promise(resolve => setTimeout(resolve, 1000)).then(
      (out) => {
        this.maiorValor = this.rendaService.maxRendaValue()[0] > this.gastoService.maxGastoValue()[0] ?
          this.rendaService.maxRendaValue()[0] : this.gastoService.maxGastoValue()[0]

        this.barChartDataGasto = [
          { data: [0], backgroundColor: "transparent", hoverBackgroundColor: "transparent" },
          { data: this.gastoService.maxGastoValue(), backgroundColor: "#d12f2f", hoverBackgroundColor: "#d12f2f" },
          { data: [this.maiorValor], backgroundColor: "transparent", hoverBackgroundColor: "transparent" }
        ];

        this.barChartDataRenda = [
          { data: [0], backgroundColor: "transparent", hoverBackgroundColor: "transparent" },
          { data: this.rendaService.maxRendaValue(), backgroundColor: "#1a981a", hoverBackgroundColor: "#1a981a" },
          { data: [this.maiorValor], backgroundColor: "transparent", hoverBackgroundColor: "transparent" }
        ];
      }
    );
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
