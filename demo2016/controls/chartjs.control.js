import chartdatahandler from '../services/chartdatahandler.service.js';
import Chart from 'scripts/Chart.min.js';

export default class {

  static components() {
    return {
      chartdatahandler
    }
  }

  static template() {
    return `
<div id="wrapper" style="width:100%;height:100%">
<canvas id="chart" style="width:100%;height:100%"></canvas>
</div>
`;
  }


    createdCallback() {
        const updateRate = 1000;

        //get chart canvas element:
        var ctx = this.$('#chart');
        //generate chart:
        var chart = new Chart(ctx, {
            type: 'line',

            data: {
                datasets: this.chartdatahandler.getData()
            },
            options: {
                animation : false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                second: "hh:mm:ss"
                        },
                        ticks: {
                            maxTicksLimit: 3
                        }
                    }
                    }],
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 0
                        }
                    }]
                }
            }
        });

        //update:
        setInterval(e => {
            chart.data.datasets = this.chartdatahandler.getData();
            chart.update();
        },updateRate);
    }
}
