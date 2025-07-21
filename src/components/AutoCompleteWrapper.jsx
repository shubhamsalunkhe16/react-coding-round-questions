import React, { useState, useRef } from "react";

const AutoCompleteWrapper = () => {
  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grapes",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Papaya",
    "Pineapple",
    "Strawberry",
    "Watermelon",
  ];

  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef();

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      const filter = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filter);
      setShowList(true);
      setActiveIndex(-1);
    } else {
      setShowList(false);
    }
  };

  const handleSelect = (item) => {
    setInput(item);
    setFiltered([]);
    setShowList(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && activeIndex < filtered.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (e.key === "ArrowUp" && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setShowList(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search fruits..."
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-expanded={showList}
        style={styles.input}
      />
      {showList && filtered.length > 0 && (
        <ul id="autocomplete-list" style={styles.list} role="listbox">
          {filtered.map((item, index) => (
            <li
              key={item}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                ...styles.item,
                ...(index === activeIndex ? styles.activeItem : {}),
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteWrapper;

const styles = {
  wrapper: {
    position: "relative",
    maxWidth: "300px",
    margin: "2rem auto",
    fontFamily: "sans-serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  list: {
    position: "absolute",
    width: "100%",
    margin: 0,
    padding: 0,
    listStyle: "none",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderTop: "none",
    zIndex: 10,
    maxHeight: "150px",
    overflowY: "auto",
  },
  item: {
    padding: "10px",
    cursor: "pointer",
  },
  activeItem: {
    backgroundColor: "#f0f0f0",
  },
};
