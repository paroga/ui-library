export default class {
	static parameters() {
		return {
			nodes: {
				type: 'array'
			}
		};
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
        const timespan = 60000;
        //create dataset:
        let datasetValue = [];
        for(let i in this.nodes){
            let c = this.nodes[i];
            let conf = {
                    label: c.text,
                    fill: false,
                    borderColor: c.color,
                    borderWidth: 2,
                    pointRadius: 0,
                    data: [{}]
                }
            datasetValue.push(conf);
        }
        //get chart canvas element:
        var ctx = this.$('#chart');
        //generate chart:
        var chart = new Chart(ctx, {
            type: 'line',

            data: {
                datasets: datasetValue
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
        //add subscriptions:
        for(let i in this.nodes){
            let c = this.nodes[i];
            this.wpcp.subscribeData([{id:c.base}], e => {
                chart.data.datasets[i].data.push({
                        x: new Date(),
                        y: e.value
                    });
                chart.update();
            });
        }

        //update:
        setInterval(function(e){
            for(let i in chart.data.datasets){
                let ds = chart.data.datasets[i].data;
                let lastValue = ds[ds.length-1].y;
                chart.data.datasets[i].data.push({
                        x: new Date(),
                        y: lastValue
                });

                //remove old data:
                let j = 0;
                while(chart.data.datasets[i].data[j+1].x.getTime() < new Date().getTime()-timespan)
                    j++;
                chart.data.datasets[i].data.splice(0,j);

                chart.update();
            }
        },updateRate);
    }
}
