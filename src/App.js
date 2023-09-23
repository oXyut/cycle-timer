import React, { useState, useEffect } from 'react';

function IntervalTimer() {
  const shortSound = () =>{
   new Audio("button70.mp3").play(); 
  }

  const longSound = () =>{
    new Audio("button79.mp3").play(); 
  }
  const [hasInteracted, setHasInteracted] = useState(false);
  const [intervals, setIntervals] = useState([30, 30]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(intervals[0]);
  const [cycleCount, setCycleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // ユーザーが初めてインタラクションを取ったときに hasInteracted を true に設定
  const handleFirstInteraction = () => {
    setHasInteracted(true);
  };


  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      if (currentIndex + 1 < intervals.length) {
        shortSound();
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(intervals[currentIndex + 1]);
      } else {
        longSound();
        setCurrentIndex(0);
        setTimeLeft(intervals[0]);
        setCycleCount(cycleCount + 1);
      }
    }

    return () => clearInterval(timerId);
  }, [timeLeft, currentIndex, intervals, cycleCount, isRunning]);

  const resetCycleCount = () => {
    setCycleCount(0);
    setTimeLeft(intervals[0]);
    setCurrentIndex(0);
  };

  const updateIntervals = (index, value) => {
    const newIntervals = [...intervals];
    newIntervals[index] = value;
    setIntervals(newIntervals);
  };

  const removeLastInterval = () => {
    const newIntervals = intervals.slice(0, -1);
    setIntervals(newIntervals);
  };

  return (
    <div>
      <h1>Interval Timer</h1>
      <div>
        {intervals.map((interval, index) => (
          <input 
            key={index}
            type="number"
            value={interval}
            onChange={(e) => updateIntervals(index, parseInt(e.target.value))}
          />
        ))}
        <button onClick={() => setIntervals([...intervals, 30])}>Add Interval</button>
        <button onClick={removeLastInterval}>Remove Interval</button>
      </div>
      <button onClick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
      <div>
        Time Left: {timeLeft} <br />
        Current Cycle: {cycleCount}
      </div>
      <button onClick={resetCycleCount}>Reset Cycle Count</button>
      <button onClick={handleFirstInteraction}>Enable Sound</button>
    </div>
  );
}

export default IntervalTimer;
