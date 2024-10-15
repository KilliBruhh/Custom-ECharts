import React, { useState, useEffect, useRef } from 'react';
import SpeedoChart from './SpeedoChart';

const App: React.FC = () => {
  const [progressVal, setProgressVal] = useState(0);   // Progress value
  const [isRunning, setIsRunning] = useState(false);   // Track whether animation is running
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Reference for the interval

  useEffect(() => {
    if (isRunning) {
      // Start the interval if isRunning is true
      intervalRef.current = setInterval(() => {
        setProgressVal(prevProgress => {
          if (prevProgress < 100) {
            return prevProgress + 1; // Increment progress
          } else {
            return 0; // Reset progress to 0 after 100%
          }
        });
      }, 50);
    } else if (intervalRef.current) {
      // Clear the interval if isRunning becomes false
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Clean up the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); // Re-run this effect only when isRunning changes

  const handleStart = () => setIsRunning(true);  // Start the animation
  const handleStop = () => setIsRunning(false);  // Stop the animation

  return (
    <div>
      <SpeedoChart min={0} max={100} progress={progressVal} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;
