import React from "react";
import LineBarChart from "./LineBarChart";
import { transformProps } from "./transformProps";

const App: React.FC = () => {
  const chartProps = {
    data: [
      { year: 2024, category: "A", value: 10},
    ],
    width: 800,
    height: 400,
    title: "Feest",
    yearAmt: 0,
  };

  const transformedProps = transformProps(chartProps);

  return (
    <div>
      <h1>Custom Line Bar Chart</h1>
      <LineBarChart {...transformedProps} />
    </div>
  );
};

export default App;
