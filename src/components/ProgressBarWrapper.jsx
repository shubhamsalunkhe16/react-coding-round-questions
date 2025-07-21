import React, { useState } from "react";

// --------- ProgressBar Component ---------
const ProgressBar = React.memo(
  ({ value, max = 100, height = "16px", showLabel = true }) => {
    // Clamp value between 0 and max and convert to percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100).toFixed(
      2
    );

    // Inline styles
    const styles = {
      container: {
        width: "100%",
        backgroundColor: "#e5e7eb", // light gray
        borderRadius: "8px",
        overflow: "hidden",
        height,
      },
      filler: {
        width: `${percentage}%`, // dynamic fill width
        backgroundColor: "#4ade80", // green
        height: "100%",
        transition: "width 0.3s ease-in-out", // smooth animation
      },
      label: {
        marginTop: "8px",
        fontSize: "14px",
        fontWeight: "500",
      },
    };

    return (
      <div>
        <div
          style={styles.container}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div style={styles.filler} />
        </div>
        {showLabel && <div style={styles.label}>{percentage}%</div>}
      </div>
    );
  }
);

// --------- Wrapper Component for Demo ---------
const ProgressBarWrapper = () => {
  const [progress, setProgress] = useState(45);

  const increase = () => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  };

  return (
    <div
      style={{ padding: "20px", maxWidth: "400px", fontFamily: "sans-serif" }}
    >
      <h2>Task Completion</h2>
      <ProgressBar value={progress} height="20px" showLabel={true} />
      <button
        onClick={increase}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#4f46e5", // indigo-600
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Increase Progress
      </button>
    </div>
  );
};

export default ProgressBarWrapper;
