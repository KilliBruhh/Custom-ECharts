// Define data structure for each oint in chart
export interface ChartDataPoint {
    name: string;
    value: number;
}

// props passed to custom chart
export interface CusstoChartProps {
    data: ChartDataPoint[];
    title: string;
    width?: number;
    height?: number;
}