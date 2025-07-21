import React, { useState } from "react";

const DragDropWrapper = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [list1, setList1] = useState(["React", "Vue", "Angular"]);
  const [list2, setList2] = useState([]);

  const handleDragStart = (e, item, fromList) => {
    setDraggedItem({ item, fromList });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, toList) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.fromList === toList) return;

    const from = draggedItem.fromList === "list1" ? list1 : list2;
    const to = toList === "list1" ? [...list1] : [...list2];

    const updatedFrom = from.filter((i) => i !== draggedItem.item);
    const updatedTo = [...to, draggedItem.item];

    if (toList === "list1") {
      setList1(updatedTo);
      setList2(updatedFrom);
    } else {
      setList2(updatedTo);
      setList1(updatedFrom);
    }

    setDraggedItem(null);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const renderList = (items, listName) => (
    <div
      style={styles.dropZone}
      onDrop={(e) => handleDrop(e, listName)}
      onDragOver={allowDrop}
      aria-label={`Drop area for ${listName}`}
    >
      <h3>{listName === "list1" ? "Available" : "Selected"}</h3>
      {items.map((item, idx) => (
        <div
          key={idx}
          draggable
          onDragStart={(e) => handleDragStart(e, item, listName)}
          style={styles.item}
        >
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Drag & Drop (No Library)</h2>
      <div style={styles.wrapper}>
        {renderList(list1, "list1")}
        {renderList(list2, "list2")}
      </div>
    </div>
  );
};

export default DragDropWrapper;

const styles = {
  container: {
    fontFamily: "sans-serif",
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  dropZone: {
    flex: 1,
    padding: "1rem",
    minHeight: "200px",
    background: "#f0f0f0",
    border: "2px dashed #ccc",
    borderRadius: "10px",
  },
  item: {
    margin: "0.5rem 0",
    padding: "0.5rem",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "grab",
  },
};
