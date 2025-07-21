import React, { useState, useRef, useEffect } from "react";

const StopwatchWrapper = () => {
  const [time, setTime] = useState(0); // time in milliseconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start the stopwatch
  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10); // update every 10ms
    }, 10);
  };

  // Pause the stopwatch
  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  // Reset the stopwatch
  const reset = () => {
    pause();
    setTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time: MM:SS:MS
  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const styles = {
    container: {
      maxWidth: "300px",
      margin: "50px auto",
      textAlign: "center",
      fontFamily: "sans-serif",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    time: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      letterSpacing: "1px",
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
    btn: {
      padding: "8px 16px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "5px",
      border: "none",
    },
    start: { background: "#28a745", color: "#fff" },
    pause: { background: "#ffc107", color: "#000" },
    reset: { background: "#dc3545", color: "#fff" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.time}>{formatTime(time)}</div>
      <div style={styles.buttons}>
        <button style={{ ...styles.btn, ...styles.start }} onClick={start}>
          Start
        </button>
        <button style={{ ...styles.btn, ...styles.pause }} onClick={pause}>
          Pause
        </button>
        <button style={{ ...styles.btn, ...styles.reset }} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopwatchWrapper;
