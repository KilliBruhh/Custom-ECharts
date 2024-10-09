// Step 1: Initialize the ECharts instance
const myChart = echarts.init(document.getElementById('myChart'));

// Step 2: Set the chart option (currently empty)
const option = {
    xAxis: {
      type: "category",
      data: [1,2,3,4,5,6,7]
    },
    yAxis: {
        type: "value",
        data: [10,20,30,40,50,60,70,80,90,100]
    },
    series: [{
        type: 'custom',
        renderItem: function (params, api) {
            var categoryIndex = api.value(0);
            var start = api.coord([api.value(1), categoryIndex]);
            var end = api.coord([api.value(2), categoryIndex]);
            var height = api.size([0, 1])[1] * 0.6;

            var rectShape = echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
            }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            });

            return rectShape && {
                type: 'rect',
                shape: rectShape,
                style: api.style()
            };
        },
        data: [50, 60, 40, 30, 20, 10, 60]
    }]
  }
// Step 3: Set the option to the chart
myChart.setOption(option);
