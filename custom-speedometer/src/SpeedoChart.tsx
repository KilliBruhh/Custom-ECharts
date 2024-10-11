import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


interface SpeedoChartProps {
  min: number;
  max: number;
  progress: number;
}

const calculatePercentage = (minVal:number, maxVal:number, progressVal:number): number => {
  // Calculate the percentage of progress
  let percentage = ((progressVal) / (maxVal)) * 100;
  percentage = parseFloat(percentage.toFixed(2));

  // If precentage exseeds 100% => lock it at 100%
  if(percentage>100) {
    percentage = 100;
  }

  return percentage;
}

const SpeedoChart: React.FC<SpeedoChartProps> = ({ min, max, progress }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Determine min and max for calculation
  const minVal = Math.min(max, min);
  const maxVal = Math.max(min, max);
  const calculatedData = calculatePercentage(minVal, maxVal, progress);
  
  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const options = {
      title: {
        text: 'Custom Arch Chart',
        left: 'center',
      },
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'custom',
          renderItem: (
            _params: any, 
            api: any
          ) => {
            const percent = api.value(0); // Access the value for rendering
            const startAngle = Math.PI; // 180 degrees start
            const endAngle = startAngle - (percent / 100) * Math.PI; // Scale the angle based on percentage

            const cx = 100; // Center X of the arch
            const cy = 60;  // Center Y of the arch
            const r = 50;   // Radius of the arch

            const style = api.style({
              stroke: 'rgba(255, 0, 0, 0.5)',
              fill: 'rgba(255, 0, 0, 0.2)',
              lineWidth: 2,
            });
  
            return {
              type: 'arc',
              shape: {
                cx,
                cy,
                r,
                startAngle,
                endAngle,
              },
              style: style,
            };
          },
          data: [calculatedData], // This should be an array of your data points
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
