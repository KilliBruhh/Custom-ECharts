export interface SpeedoChartFormData {
    min: number;
    max: number;
    progress: number;
}

export interface SpeedoChartProps {
    min: number;
    max: number;
    progress: number;
}

export interface SpeedoChartTransformedProps {
    calculatedData: number;
}

export const DEFAULT_SPEEDO_CHART_FORM_DATA: SpeedoChartFormData = {
    min: 0,
    max: 100,
    progress: 0,
};