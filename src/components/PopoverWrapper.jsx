import React, { useState, useRef, useEffect } from "react";

const PopoverWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const togglePopover = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={styles.container}>
      <button
        ref={buttonRef}
        onClick={togglePopover}
        style={styles.button}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="popover"
      >
        Toggle Popover
      </button>

      {isOpen && (
        <div id="popover" role="dialog" ref={popoverRef} style={styles.popover}>
          <p>This is a popover message!</p>
        </div>
      )}
    </div>
  );
};

export default PopoverWrapper;

const styles = {
  container: {
    position: "relative",
    display: "inline-block",
    margin: "2rem",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
  popover: {
    position: "absolute",
    top: "110%",
    left: 0,
    zIndex: 1000,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "12px 16px",
    borderRadius: "6px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "200px",
  },
};
