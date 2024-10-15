import React, { useState, useEffect } from 'react';
import SpeedoChart from './SpeedoChart';

const App: React.FC = () => {
  const [progressVal, setProgressVal] = useState(0); // useState to manage progress

  useEffect(() => {
    // Define an interval to update progress every 1.5 seconds
    const intervalId = setInterval(() => {
      setProgressVal((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1; // Increment progress
        } else {
          return 0; // Reset to 0 after reaching 100%
        }
      });
    }, 100); // 1.5 seconds delay

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array so it only runs once when the component mounts

  return (
    <div>
      <SpeedoChart min={0} max={100} progress={progressVal} />
    </div>
  );
};

export default App;
