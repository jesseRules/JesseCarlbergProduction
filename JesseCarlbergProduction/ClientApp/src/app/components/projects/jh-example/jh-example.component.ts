import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { JhExampleService } from '../../../services/jh-example.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jh-example',
  templateUrl: './jh-example.component.html',
  styleUrls: ['./jh-example.component.scss'],
})
export class JhExampleComponent implements OnInit, AfterViewInit {
  public Color = Chart.helpers.color;
  public barChart;
  public errors;
  public loading: boolean = false;
  public seed = 5;
  public fipsBase = [];
  public fips = [];
  public chartData;
  public states = [];
  public cnt = 90;

  constructor(private jhExampleService: JhExampleService) {}

  ngOnInit(): void {
    this.createChart();
    this.getFips();
    this.getStates();
  }

  getStates(): void {
    this.jhExampleService.getStates().subscribe(
      (data) => {
        this.states = data;
      },

      (error) => {
        this.errors = error;
      },
      () => {

      }
    );
  }

  getFips(): void {
    this.jhExampleService.getFips().subscribe(
      (data) => {
        this.fipsBase = data;
      },

      (error) => {
        this.errors = error;
      },
      () => {

      }
    );
  }

  getChartCountyData(county: string, count: number): void {
    this.loading = true;
    this.jhExampleService.getChartInfoCounty(county, count).subscribe(
      (data) => {
        this.chartData = data;
        this.barChart.data = data;
        this.barChart.update();
      },

      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {
        this.barChart.update();
        this.loading = false;
      }
    );
  }

  getChartStateData(state: string, count: number): void {
    this.loading = true;
    this.jhExampleService.getChartInfoState(state, count).subscribe(
      (data) => {
        this.chartData = data;
        this.barChart.data = data;
        this.barChart.update();
      },

      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {
        this.barChart.update();
        this.loading = false;
      }
    );
  }

  ngAfterViewInit(): void {}

  reloadData(): void {
    this.barChart.update();
  }

  selchange(event) {
    this.getChartStateData(event.value.fips, this.cnt);
    this.fips = this.fipsBase.filter(
      (s) => s.state == event.value.abbreviation
    );
  }

  selCountyChange(event) {
    this.getChartCountyData(event.value.fip, this.cnt);
  }

  createChart(): void {
    var options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              color: 'rgba(255,99,132,0.2)',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    this.barChart = new Chart('jhcanvas', {
      type: 'bar',
      data: this.chartData,
      options: options,
    });
  }
}
