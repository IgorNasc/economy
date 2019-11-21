import { Component, OnInit, DoCheck } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chart.js';
import { GastoService } from 'src/app/services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Operation } from 'src/app/model/operations.model';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit, DoCheck {

  listCategoryName: Array<string> = new Array<string>();
  listCategoryColor: Array<string> = new Array<string>();
  listCategoryValue: Array<number> = new Array<number>();

  // Doughnut
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    legend: {
      display: false
    }
  };
  public doughnutChartLabels: Label[] = [''];
  public doughnutChartData: ChartDataSets[] = [
    {
      data: [0],
      backgroundColor: [''],
      hoverBackgroundColor: ['']
    }
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
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartLabels: Label[] = [''];
  public barChartData: ChartDataSets[] = [
    {
      data: [0],
      backgroundColor: [''],
      hoverBackgroundColor: ['']
    }
  ];

  private month: number = 0;

  constructor(
    private gastoService: GastoService,
    private rendaService: RendaService,
    private categoryService: CategoryService,
    private headerService: HeaderService) { }

  ngOnInit() {
    // this.loadCategory();
  }

  ngDoCheck() {
    if (this.headerService.getMonth() != this.month) {
      this.loadCategory();
      this.month = this.headerService.getMonth();
    }
  }

  async loadCategory() {
    this.listCategoryName = new Array<string>();
    this.listCategoryColor = new Array<string>();
    this.listCategoryValue = new Array<number>();

    this.categoryService.loadCategory().subscribe(
      (data: Array<Category>) => {
        data.forEach(cate => {
          this.listCategoryName.push(cate.name);
          this.listCategoryColor.push(cate.color);
          this.listCategoryValue.push(this.gastoService.maxGastoByCategory(cate));
        });

        this.barChartLabels = this.listCategoryName;
        this.barChartData = [
          {
            data: this.listCategoryValue,
            backgroundColor: this.listCategoryColor,
            hoverBackgroundColor: this.listCategoryColor
          }
        ];

        this.doughnutChartLabels = this.listCategoryName;
        this.doughnutChartData = [
          {
            data: this.listCategoryValue,
            backgroundColor: this.listCategoryColor,
            hoverBackgroundColor: this.listCategoryColor
          }
        ]
      },
      (error: any) => {
        alert(error);
      }
    );
  }

}
