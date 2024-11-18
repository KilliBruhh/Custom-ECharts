import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ChartProps } from "./types";

const LineBarChart: React.FC<ChartProps> = (props:ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const {
    height,
    width,
    data,
    title,
    yearAmt,
  } = props
  

function showSeries(data:any, yearAmt:number) {
      
  // const series:any = [];

  const categories = Array.from(new Set(data.map((item: { category: any; }) => item.category)));
  const years = Array.from(new Set(data.map((item: { year: any; }) => item.year)));

  const series = years.map((year:any) => ({
    name: year.toString(),
    type: "bar",
    data: categories.map((category) => {
      const record = data.find((item: { year: any; category: unknown; }) => item.year === year && item.category === category);
      return record ? record.value : 0; // Default to 0 if no data exists
    })
  })).concat(
    years.map((year: any) => ({
      name: `${year} Line`,
      type: "line", // Line chart
      data: categories.map((category) => {
        const record = data.find(
          (item: { year: any; category: unknown }) =>
            item.year === year && item.category === category
        );
        return record ? record.value : 0; // Same logic for line chart
      }),
      lineStyle: {
        width: 4, // Customize line width
        type: "solid", // Solid line type
      },
      smooth: false, // Optional: Makes the line smoother
    }))
  );

  return series
}

  useEffect(() => {
    // Initialize the chart when the component mounts
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);  // Initialize ECharts

      const categories = Array.from(new Set(data.map((item: { category: any; }) => item.category)));
      const years = Array.from(new Set(data.map((item: { year: any; }) => item.year)));
    
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
          data: years.map((year) => year.toString()).concat(years.map((year) => `${year} Line`)),
        },
        xAxis: {
          type: 'category',
          data: categories, // Labels for the categories
        },
        yAxis: {
          type: 'value',
        },
        series: [
          // Loop x amount of times  
          ...showSeries(data, yearAmt)
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
