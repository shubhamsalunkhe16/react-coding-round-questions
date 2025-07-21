import React, { useState, useEffect } from "react";

const ToastWrapper = () => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const styles = {
    container: {
      position: "fixed",
      top: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 9999,
    },
    toast: {
      padding: "12px 16px",
      borderRadius: "6px",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      minWidth: "220px",
      fontSize: "14px",
      fontWeight: 500,
    },
    success: {
      background: "#28a745",
    },
    error: {
      background: "#dc3545",
    },
    warning: {
      background: "#ffc107",
      color: "#000",
    },
    buttons: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginTop: "60px",
    },
    btn: {
      padding: "10px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold",
    },
  };

  return (
    <div>
      <div style={styles.buttons}>
        <button
          style={{ ...styles.btn, background: "#28a745" }}
          onClick={() => addToast("success", "Success! Action completed.")}
        >
          Show Success
        </button>
        <button
          style={{ ...styles.btn, background: "#ffc107", color: "#000" }}
          onClick={() => addToast("warning", "Warning! Check your input.")}
        >
          Show Warning
        </button>
        <button
          style={{ ...styles.btn, background: "#dc3545" }}
          onClick={() => addToast("error", "Error! Something went wrong.")}
        >
          Show Error
        </button>
      </div>

      <div style={styles.container}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              ...(toast.type === "success"
                ? styles.success
                : toast.type === "warning"
                ? styles.warning
                : styles.error),
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastWrapper;
