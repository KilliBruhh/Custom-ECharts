export interface ChartProps {
    data: Array<{ year: number; category: string; value: number }>;
    width: number;
    height: number;
    title: string;
    yearAmt: number
}  