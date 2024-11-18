import { ChartProps } from "./types";

export function transformProps(chartProps: ChartProps) {
  var { data, width, height, title } = chartProps;

  title = "Chart";

  return {
    data,
    width,
    height,
    title,
  };
}
