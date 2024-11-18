enum Months {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

export type BarLineChartFormData =  {
    matrix: string;
    title: string;
    yearAmt: number 
}


export interface ChartProps {
    data: Array<{ year: number; category: string; value: number; }>;
    colors: Array<{ category: Months; color: string; opacity: number}>;
    width: number;
    height: number;
    title: string;
    yearAmt: number;
    series: Array<any>;
}  