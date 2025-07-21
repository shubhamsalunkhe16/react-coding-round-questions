import React, { useState } from "react";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
    padding: "1rem",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: "5px",
    marginTop: "1rem",
  },
  cell: {
    width: "80px",
    height: "80px",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
    cursor: "pointer",
    userSelect: "none",
    borderRadius: "8px",
  },
  status: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
  resetBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

const TicTacToeWrapper = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
  const [xTurn, setXTurn] = useState(true); // toggle between X and O
  const [winner, setWinner] = useState(null);

  // All win combinations based on cell indices
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  // Check for a winner
  const checkWinner = (newBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // ignore already filled or won

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) setWinner(win);
    else setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setWinner(null);
  };

  return (
    <div style={styles.wrapper}>
      <h2>Tic Tac Toe</h2>

      <div style={styles.board}>
        {board.map((cell, idx) => (
          <div
            key={idx}
            style={styles.cell}
            onClick={() => handleClick(idx)}
            aria-label={`Cell ${idx + 1}`}
          >
            {cell}
          </div>
        ))}
      </div>

      <div style={styles.status}>
        {winner
          ? `🎉 Winner: ${winner}`
          : board.every(Boolean)
          ? "🤝 It's a draw!"
          : `Turn: ${xTurn ? "X" : "O"}`}
      </div>

      <button onClick={resetGame} style={styles.resetBtn}>
        🔄 Reset Game
      </button>
    </div>
  );
};

export default TicTacToeWrapper;
