import React from 'react';
import SpeedoChart from './SpeedoChart'

const App = () => {
  const chartData = [20, 40, 60, 80];  // Example data

  return (
    <div>
      <SpeedoChart progress={30} />
    </div>
  );
};

export default App;