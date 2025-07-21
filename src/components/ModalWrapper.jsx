import React, { useState, useRef, useEffect } from "react";

const styles = {
  openBtn: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    position: "relative",
  },
  closeBtn: {
    marginTop: "1rem",
    padding: "8px 16px",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Close on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <>
      <button style={styles.openBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={styles.overlay}
        >
          <div ref={modalRef} style={styles.modal}>
            <h2 id="modal-title">Modal Title</h2>
            <p>This is a fully accessible modal component.</p>
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWrapper;
