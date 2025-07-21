import React, { useState, useCallback } from "react";

const PasswordGeneratorWrapper = () => {
  const [length, setLength] = useState(12);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let validChars = "";
    if (includeLower) validChars += lower;
    if (includeUpper) validChars += upper;
    if (includeNumber) validChars += numbers;
    if (includeSymbol) validChars += symbols;

    if (!validChars) return setPassword("");

    let pass = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      pass += validChars[index];
    }
    setPassword(pass);
  }, [length, includeLower, includeUpper, includeNumber, includeSymbol]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontFamily: "sans-serif",
      textAlign: "center",
    },
    inputGroup: {
      display: "flex",
      justifyContent: "space-between",
      margin: "10px 0",
    },
    passwordBox: {
      fontSize: "18px",
      padding: "10px",
      background: "#f5f5f5",
      borderRadius: "6px",
      wordBreak: "break-all",
    },
    checkbox: {
      marginLeft: "8px",
    },
    button: {
      padding: "10px 15px",
      margin: "10px 5px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      background: "#007bff",
      color: "#fff",
      fontWeight: "bold",
    },
    slider: {
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Password Generator</h2>

      <div style={styles.inputGroup}>
        <label>Password Length</label>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={styles.slider}
        />
        <strong>{length}</strong>
      </div>

      <div style={styles.inputGroup}>
        <label>
          Include Lowercase
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
            style={styles.checkbox}
          />
        </label>
      </div>
      <div style={styles.inputGroup}>
        <label>
          Include Uppercase
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
            style={styles.checkbox}
          />
        </label>
      </div>
      <div style={styles.inputGroup}>
        <label>
          Include Numbers
          <input
            type="checkbox"
            checked={includeNumber}
            onChange={(e) => setIncludeNumber(e.target.checked)}
            style={styles.checkbox}
          />
        </label>
      </div>
      <div style={styles.inputGroup}>
        <label>
          Include Symbols
          <input
            type="checkbox"
            checked={includeSymbol}
            onChange={(e) => setIncludeSymbol(e.target.checked)}
            style={styles.checkbox}
          />
        </label>
      </div>

      <button style={styles.button} onClick={generatePassword}>
        Generate Password
      </button>
      <button
        style={{ ...styles.button, background: "#28a745" }}
        onClick={copyToClipboard}
      >
        Copy
      </button>

      {password && (
        <div style={styles.passwordBox}>
          <p>{password}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordGeneratorWrapper;
