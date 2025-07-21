import React, { useState, useCallback } from "react";

// --------- Accordion Item ---------
const AccordionItem = React.memo(({ title, content, isOpen, onToggle }) => {
  const styles = {
    item: {
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      marginBottom: "10px",
      overflow: "hidden",
    },
    header: {
      background: "#f9fafb",
      padding: "12px 16px",
      fontWeight: "600",
      fontSize: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    },
    chevron: {
      transition: "transform 0.3s",
      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    },
    content: {
      padding: "12px 16px",
      backgroundColor: "#ffffff",
      fontSize: "14px",
      display: isOpen ? "block" : "none", // toggle visibility
    },
  };

  return (
    <div style={styles.item}>
      <div style={styles.header} onClick={onToggle}>
        {title}
        <span style={styles.chevron}>▶</span> {/* Unicode right arrow */}
      </div>
      <div style={styles.content}>{content}</div>
    </div>
  );
});

// --------- Accordion Component ---------
const Accordion = React.memo(({ items, allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleItem = useCallback(
    (index) => {
      setOpenIndexes((prev) => {
        // If already open, close it
        const isOpen = prev.includes(index);
        if (allowMultiple) {
          return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
        } else {
          return isOpen ? [] : [index];
        }
      });
    },
    [allowMultiple]
  );

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
});

// --------- Wrapper for Demo ---------
const AccordionWrapper = () => {
  const accordionData = [
    {
      title: "What is React?",
      content: "React is a JavaScript library for building user interfaces.",
    },
    {
      title: "Why use React?",
      content:
        "React allows for efficient, declarative, and flexible UI creation.",
    },
    {
      title: "How do you use React?",
      content:
        "You use React by creating components using JSX and managing state.",
    },
  ];

  return (
    <div
      style={{ padding: "20px", maxWidth: "600px", fontFamily: "sans-serif" }}
    >
      <h2>FAQ</h2>
      <Accordion items={accordionData} allowMultiple={false} />
    </div>
  );
};

export default AccordionWrapper;
