import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Game board
  const [isXNext, setIsXNext] = useState(true); // Track current player (X or O)
  const [winner, setWinner] = useState(null); // Track winner

  // Handle click on a cell
  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for a winner
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  // Check for a winner
  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null; // No winner yet
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="mt-11">
      <h1 className="text-center text-2xl font-bold">Tic Tac Toe</h1>
      <div className="grid grid-cols-3  mt-4">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`${
              index === 1 || index === 4 || index === 7
                ? "border-r-4 border-l-4 border-black"
                : ""
            } ${
              index === 3 || index === 4 || index === 5
                ? "border-b-4 border-t-4 border-black"
                : ""
            } p-8 flex items-center justify-center cursor-pointer text-2xl font-bold`}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="text-center mt-4">
          <p className="text-xl font-bold">{winner} Wins!</p>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reset Game
          </button>
        </div>
      )}
      {!winner && board.every((cell) => cell) && (
        <div className="text-center mt-4">
          <p className="text-xl font-bold">It's a Tie!</p>
          <button
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
