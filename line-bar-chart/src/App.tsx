import React from "react";
import LineBarChart from "./LineBarChart";
import { transformProps } from "./transformProps";

const App: React.FC = () => {
  const chartProps = {
    data: [
      { category: "A", value: 10 },
      { category: "B", value: 20 },
      { category: "C", value: 30 },
    ],
    width: 800,
    height: 400,
    title: "Feest",
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
