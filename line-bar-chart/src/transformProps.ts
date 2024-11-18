import { ChartProps } from "./types";

export function transformProps(chartProps: ChartProps) {
  var { data, width, height, title } = chartProps;

  data = [
    { category: "A", value: 60 },
    { category: "B", value: 20 },
    { category: "C", value: 100 },
  ];
  width= 800;
  height= 400;
  title = "Chart";

  return {
    data,
    width,
    height,
    title,
  };
}
