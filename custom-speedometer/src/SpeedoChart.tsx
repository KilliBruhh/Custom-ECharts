import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


interface SpeedoChartProps {
  min: number;
  max: number;
  progress: number;
}

const calculatePercentage = (minVal:number, maxVal:number, progressVal:number): number => {

  // Determine min and max for calculation
  const min = Math.min(minVal, maxVal);
  const max = Math.max(minVal, maxVal);

  // Calculate the percentage of progress
  const percentage = ((progressVal) / (max)) * 100;

  // Clamp the percentage between 0 and 100
  console.log("Percentage: "+percentage);
  console.log("MIN alue: " +min);
  console.log("MAX Value: "+max);

  return percentage;
}

const SpeedoChart: React.FC<SpeedoChartProps> = ({ min, max, progress }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const calculatedData = calculatePercentage(min, max, progress);
  console.log(calculatePercentage(min, max, progress))
  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const options = {
      title: {
        text: 'Custom Progress Bar',
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,  // Max value for the progress bar
        show: false, // Hide the axis lines
      },
      yAxis: {
        type: 'category',
        data: ['Progress'], // Label for the progress bar
        show: false, // Hide the axis labels
      },
      series: [
        // Background of the progress bar
        {
          type: 'custom',
          renderItem: (params: any, api: any) => {
            const barWidth = api.size([api.value(0), 0])[0];
            const barHeight = api.size([api.value(0), 0])[1];

            return {
              type: 'rect',
              shape: {
                x: 0,
                y: params.coordSys.height / 2 - barHeight / 2,
                width: api.coord([100, 0])[0], // Full width
                height: barHeight,
              },
              style: {
                fill: '#e0e0e0', // Background color
              },
            };
          },
          data: [[0]], // Static value for the background
        },
        // Progress indicator
        {
          type: 'custom',
          renderItem: (params: any, api: any) => {
            const progressWidth = api.coord([api.value(0), 0])[0];
            const barHeight = api.size([0, 1])[1] / 2;

            return {
              type: 'rect',
              shape: {
                x: 0,
                y: params.coordSys.height / 2 - barHeight / 2,
                width: progressWidth, // Dynamic width based on progress
                height: barHeight,
              },
              style: {
                fill: '#4caf50', // Progress color (green)
              },
            };
          },
          data: [[calculatedData]], // Dynamic progress value
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [progress]);

  return <div ref={chartRef} style={{ width: '100%', height: '100px' }} />;
};

export default SpeedoChart;
