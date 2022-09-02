import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { ICovidState } from 'src/app/interfaces/iCovidState';

@Component({
  selector: 'app-pie-chart-graphic',
  templateUrl: './pie-chart-graphic.component.html',
  styleUrls: ['./pie-chart-graphic.component.scss'],
})
export class PieChartGraphicComponent implements OnInit {
  @Input() data: Array<ICovidState> = [];
  public dataChart = [{ name: "1ª Dose", value: 0 }, { name: "2ª Dose", value: 0 }, { name: "3ª Dose", value: 0 }, { name: "Dose Única", value: 0 }];

  ngOnInit(): void {
    this.createChart();
  }

  public createChart() {
    this.updateDataChart();

    var chartDom = document.getElementById('chart')!;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#5470c6', '#3ba272', '#fac858', '#fc8452'],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Total',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.dataChart,
        },
      ],
    };

    option && myChart.setOption(option);
  }

  public updateDataChart(): void {
    this.dataChart[0].value = this.data[this.data.length - 1].vaccinated
    this.dataChart[1].value = this.data[this.data.length - 1].vaccinated_second
    this.dataChart[2].value = this.data[this.data.length - 1].vaccinated_third
    this.dataChart[3].value = this.data[this.data.length - 1].vaccinated_single
  }
}
