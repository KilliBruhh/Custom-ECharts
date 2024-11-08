import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// Define the props for the custom chart
interface LineBarChartProps {
  data: Array<{ name: string; value: number }>;  // Array of data points for the chart
  title: string;                                // Title of the chart
}

const LineBarChart: React.FC<LineBarChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLDivElement>(null);  // Reference to the chart container

  useEffect(() => {
    // Initialize the chart when the component mounts
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);  // Initialize ECharts

      // Define the chart configuration options
      const option = {
        title: {
          text: title,  // Title of the chart
        },
        tooltip: {
          trigger: 'axis',  // Tooltip on hover
        },
        xAxis: {
          type: 'category',  // X-axis as category type
          data: data.map(item => item.name),  // Categories from the data
        },
        yAxis: {
          type: 'value',  // Y-axis as value type
        },
        series: [
          {
            data: data.map(item => item.value),  // Data points for the series
            type: 'line',  // Chart type (bar chart)
            smooth: true,  // Smooth lines
            
          },
        ],
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

export default lineBarChart;
