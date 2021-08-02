import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-sample',
  templateUrl: './chart-sample.component.html',
  styleUrls: ['./chart-sample.component.scss'],
})
export class ChartSampleComponent implements OnInit, AfterViewInit {
  public Color = Chart.helpers.color;
  public barChart;
  public seed = 5;
  public chartColors = {
    blue: 'rgb(54, 162, 235)',
    green: 'rgb(75, 192, 192)',
    grey: 'rgb(201, 203, 207)',
    orange: 'rgb(255, 159, 64)',
    purple: 'rgb(153, 102, 255)',
    red: 'rgb(255, 99, 132)',
    yellow: 'rgb(255, 205, 86)',
  };
  public MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba',
  ];

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  ngAfterViewInit(): void {
    this.barChart.update();
  }

  applyDefaultNumbers(config): any {
    var cfg = config || {};
    cfg.min = cfg.min || 0;
    cfg.max = cfg.max || 1;
    cfg.from = cfg.from || [];
    cfg.count = cfg.count || 8;
    cfg.decimals = cfg.decimals || 8;
    cfg.continuity = cfg.continuity || 1;

    return cfg;
  }

  util_srand(seed): void {
    this.seed = seed;
  }

  util_rand(min, max): any {
    var seed = this.seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this.seed = (seed * 9301 + 49297) % 233280;
    return min + (this.seed / 233280) * (max - min);
  }

  util_numbers(config): any {
    var cfg = this.applyDefaultNumbers(config);
    var dfactor = Math.pow(10, cfg.decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < cfg.count; ++i) {
      value = (cfg.from[i] || 0) + this.util_rand(cfg.min, cfg.max);
      if (this.util_rand(0, 0) <= cfg.continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    return data;
  }

  util_labels(config): any {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var count = cfg.count || 8;
    var step = (max - min) / count;
    var decimals = cfg.decimals || 8;
    var dfactor = Math.pow(10, decimals) || 0;
    var prefix = cfg.prefix || '';
    var values = [];
    var i;

    for (i = min; i < max; i += step) {
      values.push(prefix + Math.round(dfactor * i) / dfactor);
    }

    return values;
  }

  util_months(config): any {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }

  util_color(index): any {
    return this.COLORS[index % this.COLORS.length];
  }

  util_transparentize(color, opacity): any {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return this.Color(color).alpha(alpha).rgbString();
  }

  randomScalingFactor(): any {
    const nbr = Math.round(this.util_rand(-100, 100));
    return nbr;
  }

  public chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: this.chartColors.blue,
        borderWidth: 2,
        fill: false,
        data: [
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
        ],
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: this.chartColors.red,
        data: [
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: this.chartColors.green,
        data: [
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
        ],
      },
    ],
  };

  reloadData(): void {
    this.chartData.datasets.forEach((dataset) => {
      dataset.data = dataset.data.map(() => {
        return this.randomScalingFactor();
      });
    });
    this.barChart.update();
  }

  createChart(): void {
    this.barChart = new Chart('canvas', {
      type: 'bar',
      data: this.chartData,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Combo Bar Line Chart',
        },
        tooltips: {
          mode: 'index',
          intersect: true,
        },
        annotation: {
          events: ['click'],
          annotations: [
            {
              drawTime: 'afterDatasetsDraw',
              id: 'hline',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.randomScalingFactor(),
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'red',
                content: 'Test Label',
                enabled: true,
              },
              onClick: function (e) {
                // The annotation is is bound to the `this` variable
                console.log('Annotation', e.type, this);
              },
            },
            {
              drawTime: 'beforeDatasetsDraw',
              type: 'box',
              xScaleID: 'x-axis-0',
              yScaleID: 'y-axis-0',
              xMin: 'February',
              xMax: 'April',
              yMin: this.randomScalingFactor(),
              yMax: this.randomScalingFactor(),
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 1,
              onClick: function (e) {
                console.log('Box', e.type, this);
              },
            },
          ],
        },
      },
    });
  }
}
