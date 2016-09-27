import chartdatahandler from '../services/chartdatahandler.service.js';

export default class {

  static components() {
    return {
      chartdatahandler
    }
  }

	static parameters() {
		return {
			nodes: {
				type: 'array'
			}
		};
	}

  static template() {
    return '<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>';
  }

    createdCallback() {

        this.$('#container').highcharts({
        title: {
            text: 'online chart',
            x: -20 //center
        },
        xAxis: {
					type: 'datetime'
        },
        yAxis: {
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: this.chartdatahandler.getData()
    	});

			setInterval(e => {
				let chart = this.$('#container').highcharts();
				let data = this.chartdatahandler.getData();
				for(let i in data){
					chart.series[i].setData(data[i].data);
				}
				chart.redraw();
			},1000);
    }
}
