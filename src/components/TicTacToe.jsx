import { useState } from "react";

function checkWinner(board) {
  const n = board.length;

  // Check rows
  for (let i = 0; i < n; i++) {
    let rowWinner = board[i][0];
    if (rowWinner === null || rowWinner === "") continue;
    let isRowSame = true;
    for (let j = 1; j < n; j++) {
      if (board[i][j] !== rowWinner) {
        isRowSame = false;
        break;
      }
    }
    if (isRowSame) return rowWinner;
  }

  // Check columns
  for (let j = 0; j < n; j++) {
    let colWinner = board[0][j];
    if (colWinner === null || colWinner === "") continue;
    let isColSame = true;
    for (let i = 1; i < n; i++) {
      if (board[i][j] !== colWinner) {
        isColSame = false;
        break;
      }
    }
    if (isColSame) return colWinner;
  }

  // Check main diagonal
  let mainDiagWinner = board[0][0];
  if (mainDiagWinner !== null && mainDiagWinner !== "") {
    let isMainDiagSame = true;
    for (let i = 1; i < n; i++) {
      if (board[i][i] !== mainDiagWinner) {
        isMainDiagSame = false;
        break;
      }
    }
    if (isMainDiagSame) return mainDiagWinner;
  }

  // Check anti-diagonal
  let antiDiagWinner = board[0][n - 1];
  if (antiDiagWinner !== null && antiDiagWinner !== "") {
    let isAntiDiagSame = true;
    for (let i = 1; i < n; i++) {
      if (board[i][n - 1 - i] !== antiDiagWinner) {
        isAntiDiagSame = false;
        break;
      }
    }
    if (isAntiDiagSame) return antiDiagWinner;
  }

  return null; // No winner
}

const TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(() =>
    Array.from({ length: size }, () => new Array(size).fill(null))
  );
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (e) => {
    const { rowIndex, colIndex } = e?.target?.dataset;
    if (!e.target.classList?.contains("cell") || board[rowIndex][colIndex])
      return;
    const boardDeepCopy = JSON.parse(JSON.stringify(board));
    boardDeepCopy[rowIndex][colIndex] = isXTurn ? "X" : "O";
    setBoard(boardDeepCopy);
    setIsXTurn((prev) => !prev);
    const winner = checkWinner(boardDeepCopy);
    setWinner(winner);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size},50px)`,
          rowGap: "10px",
          columnGap: "10px",
          background: "red",
          width: "fit-content",
          padding: "10px",
        }}
      >
        {board?.map((rowItem, rowIndex) => (
          <>
            {rowItem?.map((colItem, colIndex) => (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid black",
                  fontSize: "30px",
                  fontWeight: "bold",
                  display: "grid",
                  placeItems: "center",
                }}
                className="cell"
                data-row-index={rowIndex}
                data-col-index={colIndex}
              >
                {colItem}
              </div>
            ))}
          </>
        ))}
      </div>

      <h3>
        {winner
          ? `${winner} is the winner`
          : `${isXTurn ? "X" : "O"} its your turn`}
      </h3>
    </>
  );
};

export default TicTacToe;
