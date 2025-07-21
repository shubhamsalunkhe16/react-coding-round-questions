import React, { useRef, useState, useEffect, useCallback } from "react";

const VirtualizedListWrapper = () => {
  const totalItems = 10000;
  const itemHeight = 35;
  const containerHeight = 400;

  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(totalItems, startIndex + visibleItemCount + 1);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Virtualized List (No Library)</h2>
      <div
        ref={containerRef}
        style={{ ...styles.container, height: containerHeight }}
        aria-label="Virtualized scroll list"
      >
        <div style={{ height: totalItems * itemHeight, position: "relative" }}>
          {visibleItems.map((item, i) => {
            const index = startIndex + i;
            return (
              <div
                key={index}
                style={{
                  ...styles.item,
                  top: index * itemHeight,
                  height: itemHeight,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedListWrapper;

const styles = {
  wrapper: {
    maxWidth: "400px",
    margin: "2rem auto",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  container: {
    overflowY: "auto",
    border: "1px solid #ccc",
    position: "relative",
  },
  item: {
    position: "absolute",
    left: 0,
    right: 0,
    borderBottom: "1px solid #eee",
    padding: "8px 10px",
    boxSizing: "border-box",
    background: "#fff",
  },
};
