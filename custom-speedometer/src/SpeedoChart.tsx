import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


interface SpeedoChartProps {
  min: number;
  max: number;
  progress: number;
}

const calculatePercentage = (minVal: number, maxVal: number, progressVal: number): number => {

  // Determine min and max for calculation
  const min = Math.min(minVal, maxVal);
  const max = Math.max(minVal, maxVal);

  // Calculate the percentage of progress
  let percentage = ((progressVal) / (max)) * 100;
  percentage = parseFloat(percentage.toFixed(2));

  // Clamp the percentage between 0 and 100
  console.log("Percentage: " + percentage);
  console.log("MIN alue: " + min);
  console.log("MAX Value: " + max);

  if (percentage > 100) {
    percentage = 100;
  }

  return percentage;
}

const SpeedoChart: React.FC<SpeedoChartProps> = ({ min, max, progress }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const calculatedData = calculatePercentage(min, max, progress);

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const options = {
      title: {
        text: `Progress: ${calculatedData}%`,
        left: 110,
        top: 270,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,  // Max value for the progress bar
        show: true, // Hide the axis lines
      },
      yAxis: {
        type: 'category',
        data: ['Progress'], // Label for the progress bar
        show: false, // Hide the axis labels
      },
      series: [{
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const startAngle = -Math.PI; // Starting angle for the arc (180 degrees)
          const endAngle = startAngle + (Math.PI * (calculatedData / 100)); // Ending angle based on progress

          // Create the Rainbow Arch radiuses
          const outerRadius = 100;
          const innerRadius = 80;

          const cx = api.coord([0, 0])[0]; // Center x
          const cy = api.coord([0, 0])[1]; // Center y

          return {
            type: 'path',
            shape: {
              pathData: `
                M ${cx + innerRadius * Math.cos(startAngle)} ${cy + innerRadius * Math.sin(startAngle)}
                A ${innerRadius} ${innerRadius} 0 0 1
                  ${cx + innerRadius * Math.cos(endAngle)} ${cy + innerRadius * Math.sin(endAngle)}
                L ${cx + outerRadius * Math.cos(endAngle)} ${cy + outerRadius * Math.sin(endAngle)}
                A ${outerRadius} ${outerRadius} 0 0 0
                  ${cx + outerRadius * Math.cos(startAngle)} ${cy + outerRadius * Math.sin(startAngle)}
                Z
              `,
            },
            style: {
              fill: '#4caf50', // Progress color (green)
              stroke: '#000', // Outline color
              lineWidth: 2,
            },
          };
        }
      },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [progress]);

  return <div ref={chartRef} style={{ width: '100%', height: '120px' }} />;
};

export default SpeedoChart;
