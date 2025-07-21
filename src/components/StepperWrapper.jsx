import React, { useState, useEffect } from "react";

const StepperWrapper = () => {
  const steps = ["Basic Info", "Contact Details", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("stepFormData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          age: "",
          email: "",
          phone: "",
        };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("stepFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (currentStep === 0) {
      if (!formData.name.trim()) tempErrors.name = "Name is required";
      if (!formData.age.trim()) tempErrors.age = "Age is required";
    } else if (currentStep === 1) {
      if (!formData.email.trim()) tempErrors.email = "Email is required";
      if (!formData.phone.trim()) tempErrors.phone = "Phone is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const goNext = () => {
    if (validate() && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.age && <span style={styles.error}>{errors.age}</span>}
          </label>
        </>
      );
    } else if (currentStep === 1) {
      return (
        <>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.phone && <span style={styles.error}>{errors.phone}</span>}
          </label>
        </>
      );
    } else {
      return (
        <div>
          <h4>Review Your Info:</h4>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
        </div>
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Multi-Step Form</h2>

      <div style={styles.stepper}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              ...styles.step,
              ...(index === currentStep ? styles.activeStep : {}),
              ...(index < currentStep ? styles.completedStep : {}),
            }}
          >
            <span style={styles.stepNumber}>{index + 1}</span>
            <span style={styles.stepLabel}>{step}</span>
          </div>
        ))}
      </div>

      <div style={styles.content}>{renderStepContent()}</div>

      <div style={styles.buttons}>
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          style={{
            ...styles.button,
            ...(currentStep === 0 ? styles.disabled : {}),
          }}
        >
          Back
        </button>
        <button
          onClick={goNext}
          disabled={currentStep === steps.length - 1}
          style={{
            ...styles.button,
            ...(currentStep === steps.length - 1 ? styles.disabled : {}),
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepperWrapper;

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  stepper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
  },
  step: {
    textAlign: "center",
    flex: 1,
    padding: "0.5rem",
    position: "relative",
    color: "#999",
  },
  activeStep: {
    fontWeight: "bold",
    color: "#007bff",
  },
  completedStep: {
    color: "green",
  },
  stepNumber: {
    display: "block",
    fontSize: "1.2rem",
    marginBottom: "0.25rem",
  },
  stepLabel: {
    fontSize: "0.9rem",
  },
  content: {
    minHeight: "120px",
    marginBottom: "1.5rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "100%",
    marginTop: "0.25rem",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "0.25rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "0.5rem 1.25rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  disabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};
