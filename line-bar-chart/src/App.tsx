import React from "react";
import LineBarChart from "./LineBarChart";
import { transformProps } from "./transformProps";

const App: React.FC = () => {
  const chartProps = {
    data: [
      { year: 0, category: "0", value: 0},
    ],
    width: 0,
    height: 0,
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
