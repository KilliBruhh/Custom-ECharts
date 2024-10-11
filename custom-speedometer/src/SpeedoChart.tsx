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
        text: 'Arch Chart Example',
      },
      xAxis: {
          min: -1,
          max: 1,
          show: false
      },
      yAxis: {
          min: 0,
          max: 1,
          show: false
      },
      series: [
        {
          type: 'custom',
          renderItem: function (
            _params: any, 
            api: any)  
            {
              var x = api.coord([api.value(0), 0])[0];
              var y = api.coord([0, 0])[1];
              var radius = api.size([0, 1])[1];

              return {
                  type: 'arc',
                  shape: {
                      cx: x,
                      cy: y,
                      r: radius * .8,  // Adjust the radius of the arch
                      startAngle: Math.PI,  // Start from the left (180 degrees)
                      endAngle: 0           // End at the right (0 degrees)
                  },
                  style: {
                      stroke: 'blue',       // Color of the arch
                      fill: 'none',         // No fill for the arch
                      lineWidth: 5          // Thickness of the arch line
                  }
              };
          },
          data: [[0]]  // Single data point to define the center of the arch
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [progress]);

  return <div ref={chartRef} style={{ width: '100%', height: '920px' }} />;
};

export default SpeedoChart;
