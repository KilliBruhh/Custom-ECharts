import React from 'react';
import ProgresBar from './ProgresBar'

const App = () => {

  return (
    <div>
      <ProgresBar min={0} max={100000} progress={50000} />
    </div>
  );
};

export default App;