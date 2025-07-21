import React, { useState, useEffect, useCallback } from "react";

// --------- Carousel Component ---------
const Carousel = React.memo(
  ({ images = [], autoPlay = true, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);
    const total = images.length;

    // Move to next slide
    const nextSlide = useCallback(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, [total]);

    // Move to previous slide
    const prevSlide = useCallback(() => {
      setCurrent((prev) => (prev - 1 + total) % total);
    }, [total]);

    // AutoPlay using useEffect
    useEffect(() => {
      if (!autoPlay) return;
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer); // Clear on unmount or change
    }, [nextSlide, interval, autoPlay]);

    const styles = {
      wrapper: {
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        height: "300px",
        overflow: "hidden",
        borderRadius: "8px",
        margin: "0 auto",
      },
      slide: {
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.5s ease-in-out",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
      },
      activeSlide: {
        opacity: 1,
        zIndex: 1,
      },
      controls: {
        position: "absolute",
        top: "50%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        transform: "translateY(-50%)",
        padding: "0 10px",
        boxSizing: "border-box",
        zIndex: 1,
      },
      arrow: {
        background: "#ffffffcc",
        border: "none",
        borderRadius: "50%",
        fontSize: "20px",
        cursor: "pointer",
        padding: "8px",
        userSelect: "none",
      },
      dots: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        gap: "6px",
      },
      dot: (isActive) => ({
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: isActive ? "#4ade80" : "#d1d5db", // green / gray
        cursor: "pointer",
      }),
    };

    return (
      <div>
        <div style={styles.wrapper}>
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                ...(index === current ? styles.activeSlide : {}),
                backgroundImage: `url(${img})`,
              }}
            />
          ))}

          {/* Navigation Arrows */}
          <div style={styles.controls}>
            <button style={styles.arrow} onClick={prevSlide}>
              ◀
            </button>
            <button style={styles.arrow} onClick={nextSlide}>
              ▶
            </button>
          </div>
        </div>

        {/* Dots */}
        <div style={styles.dots}>
          {images.map((_, index) => (
            <div
              key={index}
              style={styles.dot(index === current)}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    );
  }
);

// --------- Wrapper Component for Demo ---------
const CarouselWrapper = () => {
  const images = [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/2/200/300",
    "https://picsum.photos/id/3/200/300",
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Simple Carousel</h2>
      <Carousel images={images} autoPlay={true} interval={4000} />
    </div>
  );
};

export default CarouselWrapper;
