import React, { useRef, useState } from "react";

// -------- OTP Input Component --------
const OtpInput = React.memo(({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only digits or empty
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus(); // Auto focus next
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus(); // Go back if empty
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const styles = {
    container: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginTop: "20px",
    },
    input: {
      width: "40px",
      height: "50px",
      fontSize: "24px",
      textAlign: "center",
      border: "1px solid #ccc",
      borderRadius: "6px",
      outline: "none",
    },
  };

  return (
    <div style={styles.container}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          style={styles.input}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
});

// -------- Wrapper for Demo --------
const OtpInputWrapper = () => {
  const [otp, setOtp] = useState("");

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}
    >
      <h2>Enter OTP</h2>
      <OtpInput length={6} onChange={setOtp} />
      <p style={{ marginTop: "12px" }}>Typed OTP: {otp}</p>
    </div>
  );
};

export default OtpInputWrapper;
