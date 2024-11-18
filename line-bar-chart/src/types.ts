export interface ChartProps {
    data: Array<{ category: string; value: number }>;
    width: number;
    height: number;
    title: string;
}  