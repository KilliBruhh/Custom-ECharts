import React from 'react';
import SpeedoChart from './SpeedoChart'

const App = () => {

  return (
    <div>
      <SpeedoChart min={0} max={100} progress={5} />
    </div>
  );
};

export default App;