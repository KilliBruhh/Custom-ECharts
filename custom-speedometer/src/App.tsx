import React from 'react';
import SpeedoChart from './SpeedoChart'

const App = () => {

  return (
    <div>
      <SpeedoChart min={0} max={100000} progress={522} />
    </div>
  );
};

export default App;