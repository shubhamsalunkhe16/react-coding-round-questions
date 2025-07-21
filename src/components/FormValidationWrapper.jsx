import React, { useState } from "react";

const FormValidationWrapper = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Email and password validators
  const validate = () => {
    const errs = {};
    const { email, password } = formData;

    if (!email) {
      errs.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = "Invalid email format.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            aria-label="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            aria-label="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && (
            <span style={styles.error}>{errors.password}</span>
          )}
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {submitted && <p style={styles.success}>Login successful ✅</p>}
    </div>
  );
};

export default FormValidationWrapper;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "sans-serif",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
    display: "block",
  },
  success: {
    color: "green",
    marginTop: "1rem",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
