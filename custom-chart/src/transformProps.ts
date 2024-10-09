import { CusstoChartProps } from "./types";

export default function tranformProps(chartProps: CusstoChartProps) {
    const { data, title } = chartProps;

    return {
        data,
        title,
        width: chartProps.width || 400,     // Default width
        height: chartProps.width || 300,        // Default height
    };
}