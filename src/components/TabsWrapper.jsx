import React, { useState } from "react";

const TabsWrapper = () => {
  const tabs = [
    { label: "Home", content: "Welcome to the Home tab!" },
    { label: "Profile", content: "This is your Profile information." },
    { label: "Settings", content: "Adjust your preferences in Settings." },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Tabs Component</h2>

      <div role="tablist" aria-label="App Tabs" style={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            style={{
              ...styles.tab,
              ...(activeTab === index ? styles.activeTab : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`tab-panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        style={styles.tabPanel}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabsWrapper;

const styles = {
  wrapper: {
    maxWidth: "500px",
    margin: "2rem auto",
    fontFamily: "sans-serif",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    backgroundColor: "#fafafa",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  tabList: {
    display: "flex",
    borderBottom: "1px solid #ccc",
  },
  tab: {
    flex: 1,
    padding: "10px",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    fontWeight: "bold",
  },
  activeTab: {
    borderBottom: "2px solid #007bff",
    color: "#007bff",
  },
  tabPanel: {
    padding: "1rem",
    minHeight: "100px",
    marginTop: "1rem",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "4px",
  },
};
