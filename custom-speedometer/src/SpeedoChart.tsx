import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const CustomBarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Define the custom bar chart option
    const option = {
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'custom',
          renderItem: function (_params: any, api: any) {
            const total = api.value(0);
            const value = api.value(1);
            const angle = (value / total) * Math.PI;

            const x = api.getWidth() / 2;
            const y = api.getHeight();
            const radius = Math.min(x, y) / 2;

            return {
              type: 'arc',
              shape: {
                cx: x,
                cy: y,
                r: radius,
                r0: 0,
                startAngle: -Math.PI,
                endAngle: -Math.PI + angle,
              },
              style: {
                fill: api.visual('color'), // Add color to the arc
              },
            };
          },
          data: [
            { name: 'Data 1', value: 30 },
            { name: 'Data 2', value: 70 },
            { name: 'Data 3', value: 10 },
          ],
        },
      ],
    };

    // Render the chart
    chart.setOption(option);

    // Cleanup function
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div>
      <h2>Half Pie Chart</h2>
      <div
        ref={chartRef}  // Attach ref to the chart container
        style={{ width: '600px', height: '400px' }}  // Set size for the chart
      />
    </div>
  );  // End return
};

export default CustomBarChart;
