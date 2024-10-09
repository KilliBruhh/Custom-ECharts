# Custom chart development

## initialize project:
```npm init -y```

## HTML File
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom ECharts Example</title>
    <style>
        #myChart {
            width: 600px;
            height: 400px;
        }
    </style>
</head>
<body>
    <div id="myChart"></div>
    <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    <script src="chart.js"></script>
</body>
</html>
```

## Base Chart Code
```js
const myChart = echarts.init(document.getElementById('myChart'));

// Specify the chart configuration
const option = {
    title: {
        text: 'Simple Custom Chart',
        subtext: 'Demo Chart',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Sales', 'Expenses'],
        left: 'left'
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Sales',
            type: 'line',
            data: [120, 200, 150, 80, 70, 110, 130],
            smooth: true,
            lineStyle: {
                color: '#5470c6'
            }
        },
        {
            name: 'Expenses',
            type: 'line',
            data: [80, 90, 100, 70, 60, 80, 120],
            smooth: true,
            lineStyle: {
                color: '#91cc75'
            }
        }
    ]
};

// Use the specified configuration and data to show the chart
myChart.setOption(option);

```

## Start server
```live-server```