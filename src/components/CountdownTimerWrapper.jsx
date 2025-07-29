import React, { useEffect, useState } from "react";

// -------- Countdown Timer Component --------
const CountdownTimer = React.memo(({ initialSeconds = 90 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  // Convert seconds to HH:MM:SS format
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((unit) => unit.toString().padStart(2, "0")).join(":");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear on unmount or update
  }, [timeLeft]);

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "10px",
      width: "fit-content",
      margin: "0 auto",
      fontFamily: "sans-serif",
    },
    timer: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: timeLeft <= 10 ? "#ef4444" : "#22c55e", // red if near end
    },
    label: {
      fontSize: "1rem",
      color: "#555",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.label}>Countdown Timer</div>
      <div style={styles.timer}>{formatTime(timeLeft)}</div>
    </div>
  );
});

// -------- Wrapper for Demo --------
const CountdownTimerWrapper = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Countdown Example</h2>
      <CountdownTimer initialSeconds={2 * 60} /> {/* 2 minutes */}
    </div>
  );
};

export default CountdownTimerWrapper;
