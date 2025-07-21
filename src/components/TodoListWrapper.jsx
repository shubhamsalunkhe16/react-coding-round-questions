import React, { useState } from "react";

const TodoListWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add new todo
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  // Toggle complete state
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Start editing a todo
  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  // Save edited todo
  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() || todo.text } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const styles = {
    wrapper: {
      maxWidth: "400px",
      margin: "40px auto",
      fontFamily: "sans-serif",
    },
    inputRow: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      flex: 1,
      padding: "8px",
      fontSize: "16px",
    },
    button: {
      padding: "8px 12px",
      fontSize: "16px",
      cursor: "pointer",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px",
      borderBottom: "1px solid #ddd",
    },
    text: (completed) => ({
      textDecoration: completed ? "line-through" : "none",
      flex: 1,
      marginRight: "10px",
    }),
    editInput: {
      flex: 1,
      padding: "6px",
      fontSize: "16px",
      marginRight: "8px",
    },
    actionBtns: {
      display: "flex",
      gap: "6px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <h2>Todo List 📝</h2>
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button style={styles.button} onClick={addTodo}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.item}>
            {editId === todo.id ? (
              <>
                <input
                  style={styles.editInput}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(todo.id);
                    if (e.key === "Escape") cancelEdit();
                  }}
                />
                <div style={styles.actionBtns}>
                  <button onClick={() => saveEdit(todo.id)}>💾</button>
                  <button onClick={cancelEdit}>❌</button>
                </div>
              </>
            ) : (
              <>
                <span
                  style={styles.text(todo.completed)}
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.text}
                </span>
                <div style={styles.actionBtns}>
                  <button onClick={() => startEditing(todo.id, todo.text)}>
                    ✏️
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListWrapper;
