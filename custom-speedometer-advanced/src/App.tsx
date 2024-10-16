import React, { useState, useEffect, useRef } from 'react';
import SpeedoChart from './SpeedoChart';

const App: React.FC = () => {
  const [progressVal, setProgressVal] = useState(5);
  const [progressVal2, setProgressVal2] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [incrementValue1, setIncrementValue1] = useState(1);
  const [incrementValue2, setIncrementValue2] = useState(2);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setProgressVal((prevProgress) => (prevProgress < maxValue ? prevProgress + incrementValue1 : minValue));
        setProgressVal2((prevProgress) => (prevProgress < maxValue ? prevProgress + incrementValue2 : minValue));
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, incrementValue1, incrementValue2, maxValue, minValue]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (
    <div className="app-container">
      <SpeedoChart min={minValue} max={maxValue} progress={progressVal} progress2={progressVal2} />
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
      </div>
      <div className="config">
        <label>
          Min Value:
          <input type="number" value={minValue} onChange={(e) => setMinValue(Number(e.target.value))} />
        </label>
        <label>
          Max Value:
          <input type="number" value={maxValue} onChange={(e) => setMaxValue(Number(e.target.value))} />
        </label>
        <label>
          Progress Increment 1:
          <input type="number" value={incrementValue1} onChange={(e) => setIncrementValue1(Number(e.target.value))} />
        </label>
        <label>
          Progress Increment 2:
          <input type="number" value={incrementValue2} onChange={(e) => setIncrementValue2(Number(e.target.value))} />
        </label>
      </div>
    </div>
  );
};

export default App;
