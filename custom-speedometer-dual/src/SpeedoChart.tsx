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

  // Values 1st Main Chart

  const startAngle = -Math.PI; // Starting angle for the arc (180 degrees)
  const endAngle = startAngle + (Math.PI * (calculatedData / 100)); // Ending angle based on progress
  const outerRadius = 110;
  const innerRadius = 80;


  // Values / Types for Segment Chart (use type.ts file in superset)

  var outerRadiusSecondChart = 115;
  var innerRadiusSecondChart = 122;
  const segments = [
    {start: 0, end: 50, color: "#49b53f"},
    {start: 50, end: 70, color: "#dba307"},
    {start: 70, end: 100, color: "#db0707"},
  ]


  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const options = {
      title: {
        text: `Progress: ${calculatedData}% \n\n Progress 2: ${calculatedData2}%`,
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
        { // Start Segmented Charts
          type: 'custom',
          renderItem: (params: any, api:any) => {

            const cx = api.coord([0,0])[0];  // Center x
            const cy = api.coord([0,0])[1];  // Center y

            const segmentArcs = segments.map((segment) => {
              const startAngle = -Math.PI + (Math.PI * (segment.start / 100)); // Convert start percentage to radians
              const endAngle = -Math.PI + (Math.PI * (segment.end / 100)); // Convert end percentage to radians

              return {
                type: 'path',
                shape: {
                  pathData:`
                    M ${cx + innerRadiusSecondChart * Math.cos(startAngle)} ${cy + innerRadiusSecondChart * Math.sin(startAngle)}
                    A ${innerRadiusSecondChart} ${innerRadiusSecondChart} 0 0 1
                      ${cx + innerRadiusSecondChart * Math.cos(endAngle)} ${cy + innerRadiusSecondChart * Math.sin(endAngle)}
                    L ${cx + outerRadiusSecondChart * Math.cos(endAngle)} ${cy + outerRadiusSecondChart * Math.sin(endAngle)}
                    A ${outerRadiusSecondChart} ${outerRadiusSecondChart} 0 0 0
                      ${cx + outerRadiusSecondChart * Math.cos(startAngle)} ${cy + outerRadiusSecondChart * Math.sin(startAngle)}
                    Z
                    `,
                  },
                  style: {
                    fill: segment.color,
                    stroke: '#000',
                    lineWidth: 2,
                  },
              };
            });
            return {
              type: 'group',
              children: segmentArcs, // Add all arcs as children of the group
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
