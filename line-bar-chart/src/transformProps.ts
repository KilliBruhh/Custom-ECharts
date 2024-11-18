import { color } from "echarts";
import { ChartProps } from "./types";

export function countUniqueYears(dataGi:any) {
  const yearAmt = new Set();
  dataGi.forEach((item: { year: any; })=> {
    yearAmt.add(item.year)    
  });
  return yearAmt.size
}

export function setColorArray(data:any) {
  const colors: string[] = []; // Initialize colors as an array

  const uniqueCategoryByYear = new Map<number, string[]>();

  data.forEach((d: any) => {
    if (!uniqueCategoryByYear.has(d.year)) {
      uniqueCategoryByYear.set(d.year, []); // Initialize for the year
    }

    const categories = uniqueCategoryByYear.get(d.year)!;
    if (!categories.includes(d.category)) {
      categories.push(d.category); // Add to Map
      if (!colors.includes(d.category)) {
        colors.push(d.category); // Add to colors array
      }
    }
  });

  console.log(colors); // All unique categories across years
  console.log(Array.from(uniqueCategoryByYear.entries()));

}

export function transformProps(chartProps: ChartProps) {
  var { data, width, height, title } = chartProps;

  data = [
    // 2024
    { year: 2024, category: "January", value: 60 },
    { year: 2024, category: "February", value: 20 },
    { year: 2024, category: "March", value: 100 },
    // 2023
    { year: 2023, category: "January", value: 30 },
    { year: 2023, category: "February", value: 10 },
    { year: 2023, category: "March", value: 50 },
    // 2022
    { year: 2022, category: "January", value: 60 },
    { year: 2022, category: "February", value: 60 },
    { year: 2022, category: "March", value: 10 },
  ];
  width= 800;
  height= 400;
  title = "Inkomsten";

  setColorArray(data)

  const categories = Array.from(new Set(data.map((item: { category: any; }) => item.category)));
  const years = Array.from(new Set(data.map((item: { year: any; }) => item.year)));

  // The amount of unique years = amt of bar/line charts per cat
  const yearAmt = countUniqueYears(data);
  
  return {
    data,
    width,
    height,
    title,
    yearAmt,
  };
}
