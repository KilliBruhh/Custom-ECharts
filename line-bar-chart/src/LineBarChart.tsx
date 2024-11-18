import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ChartProps } from "./types";

const LineBarChart: React.FC<ChartProps> = (props:ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const {
    height,
    width,
    data,
    title
  } = props

  useEffect(() => {
    // Initialize the chart when the component mounts
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);  // Initialize ECharts

      // Define the chart configuration options
      const option = {
        title: {
          text: title, // Title of the chart
        },
        tooltip: {
          trigger: 'axis', // Tooltip on hover
          axisPointer: {
            type: 'shadow', // Shadow pointer
          },
        },
        legend: {
          data: ['Value 1', 'Value 2', 'Value 3'], // Legend for the series
        },
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C'], // Labels for the categories
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'custom',
            renderItem: function (params:any, api:any) {
              // x position of the bar
              const x = api.coord([api.value(0), 0])[0];
              // y position of the bar (bottom of the chart to the data value height)
              const y = api.coord([0, api.value(1)])[1];
              // Bar width and height
              const width = api.size([1, 0])[0] * 0.6; // 60% of the category width
              const height = api.size([0, api.value(1)])[1];
              
              // Return the graphical element configuration
              return {
                type: 'rect',
                shape: {
                  x: x - width / 2, // Center the bar
                  y: y,
                  width: width,
                  height: height,
                },
                style: api.style(), // Use default styling (color, etc.)
              };
            },
            data: data
          },// End Serie 1
        ], // End Serie Block
      };
      

      // Set the option for the chart instance
      chartInstance.setOption(option);

      // Cleanup function to dispose of the chart when component unmounts
      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, title]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px' }}  // Style for chart container
    />
  );
};

export default LineBarChart;
