import React, { useState, useMemo, useCallback } from "react";

// Plain CSS
const styles = {
  container: {
    display: "flex",
    gap: "4px",
    cursor: "pointer",
    userSelect: "none",
  },
  star: {
    fontSize: "24px",
    transition: "color 0.2s",
  },
};

// Unicode Star Component
const Star = React.memo(({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  const fillColor = filled ? "#facc15" : "#e5e7eb"; // yellow or gray

  return (
    <span
      style={{ ...styles.star, color: fillColor }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ★
    </span>
  );
});

// Main StarRating Component
const StarRating = React.memo(
  ({ maxStars = 5, rating, onRatingChange, readOnly = false }) => {
    const [hovered, setHovered] = useState(null);

    const handleClick = useCallback(
      (index) => {
        if (!readOnly) onRatingChange?.(index + 1);
      },
      [onRatingChange, readOnly]
    );

    const stars = useMemo(() => {
      return Array.from({ length: maxStars }, (_, index) => (
        <Star
          key={index}
          filled={hovered !== null ? index <= hovered : index < rating}
          onClick={() => handleClick(index)}
          onMouseEnter={() => !readOnly && setHovered(index)}
          onMouseLeave={() => !readOnly && setHovered(null)}
        />
      ));
    }, [maxStars, rating, hovered, handleClick, readOnly]);

    return (
      <div style={styles.container} role="radiogroup" aria-label="Star Rating">
        {stars}
      </div>
    );
  }
);

// Usage Wrapper
const StarRatingWrapper = () => {
  const [rating, setRating] = useState(4);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Rate your experience:</h2>
      <StarRating rating={rating} onRatingChange={setRating} />
      <p style={{ marginTop: "12px" }}>You rated: {rating}</p>
    </div>
  );
};

export default StarRatingWrapper;
