import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface SpeedoChartProps {
  min: number;
  max: number;
  progress: number;
  progress2: number;
}

const calculatePercentage = (minVal: number, maxVal: number, progressVal: number): number => {
  let percentage = ((progressVal - minVal) / (maxVal - minVal)) * 100; // Correctly normalize the progress
  percentage = parseFloat(percentage.toFixed(2));

  // Ensure percentage does not exceed 100% or fall below 0%
  if (percentage > 100) {
    percentage = 100;
  } else if (percentage < 0) {
    percentage = 0;
  }

  return percentage;
}

const SpeedoChart: React.FC<SpeedoChartProps> = ({ min, max, progress, progress2 }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const calculatedData = calculatePercentage(min, max, progress);
  const calculatedData2 = calculatePercentage(min, max, progress2);

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const options = {
      title: {
        text: `Progress: ${calculatedData}% \n\n Progress 2: ${calculatedData2}%`,
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        show: false,
      },
      yAxis: {
        type: 'category',
        data: [''],
        show: false,
      },
      series: [
        {
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
        },
        data: [{}], // Single data item to trigger renderItem
        },
        {
          type: 'custom',
          renderItem: (params: any, api:any) => {
            const startAngle = -Math.PI;
            const endAngle2 = startAngle + (Math.PI * (calculatedData2/100));

            const outerRadius2 = 120;
            const innerRadius2 = 100;

            const cx = api.coord([0,0])[0];  // Center x
            const cy = api.coord([0,0])[1];  // Center y

            return {
              type: 'path',
              shape: {
                pathData: `
                M ${cx + innerRadius2* Math.cos(startAngle)} ${cy + innerRadius2 * Math.sin(startAngle)}
                A ${innerRadius2} ${innerRadius2} 0 0 1 
                  ${cx + innerRadius2 * Math.cos(endAngle2)} ${cy + innerRadius2 * Math.sin(endAngle2)}
                L ${cx + outerRadius2 * Math.cos(endAngle2)} ${cy + outerRadius2 * Math.sin(endAngle2)}
                A ${outerRadius2} ${outerRadius2} 0 0 0 
                  ${cx + outerRadius2 * Math.cos(startAngle)} ${cy + outerRadius2 * Math.sin(startAngle)}
                Z
                `
              },
              style: {
                fill: '#3234a8', // Progress color (green)
                stroke: '#000', // Outline color
                lineWidth: 2,
              },
            };
          },
          data: [{}]
        },
    ],      
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [progress]);

  return <div ref={chartRef} style={{ width: '100%', height: '520px' }} />;
};

export default SpeedoChart;
