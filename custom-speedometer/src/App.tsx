import React from 'react';
import SpeedoChart from './SpeedoChart'

const App = () => {

  return (
    <div>
      <SpeedoChart min={50} max={1000} progress={50} />
    </div>
  );
};

export default App;