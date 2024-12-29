import React, { useState } from "react";

const Pattern = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Game board
  const [isNext, setIsNext] = useState(true); // Track current player (X or O)
  const [winner, setWinner] = useState(null); // Track winner
  const [winningLine, setWinningLine] = useState([]); // Track winning combination

  // Handle click on a cell
  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent clicking on filled cells or after game over
    const newBoard = [...board];
    newBoard[index] = isNext ? "X" : "O";
    setBoard(newBoard);
    setIsNext(!isNext);

    // Check for a winner
    const game = checkWinner(newBoard);
    if (game) {
      setWinner(game.winner);
      setWinningLine(game.line);
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
        return { winner: board[a], line: combination };
      }
    }
    return null;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Tic Tac Toe</h1>

        {/* Display Current Player */}
        {!winner && (
          <p className="text-center mb-4 text-xl">
            Next Player: <span className="font-semibold text-blue-600">{isNext ? "X" : "O"}</span>
          </p>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => {
            const isWinningCell = winningLine.includes(index);
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`relative h-24 w-24 flex items-center justify-center text-3xl font-bold rounded-lg 
                  ${
                    isWinningCell
                      ? "bg-green-300 text-white animate-pulse"
                      : "bg-blue-50 hover:bg-blue-100 transition-colors"
                  }
                  ${
                    !winner && !cell
                      ? "cursor-pointer hover:shadow-inner"
                      : "cursor-default"
                  }
                  `}
              >
                {cell}
                {/* Optional: Highlight Winning Cells with a Border */}
                {isWinningCell && (
                  <div className="absolute inset-0 border-4 border-green-500 rounded-lg pointer-events-none"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Winner Announcement */}
        {winner && (
          <div className="mt-6 text-center">
            <p className="text-2xl font-semibold text-green-600">
              {winner} <span className="animate-bounce">🎉</span> Wins!
            </p>
            <button
              onClick={resetGame}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Reset Game
            </button>
          </div>
        )}

        {/* Tie Announcement */}
        {!winner && board.every((cell) => cell) && (
          <div className="mt-6 text-center">
            <p className="text-2xl font-semibold text-yellow-600">
              It's a <span className="underline">Tie</span>! 🤝
            </p>
            <button
              onClick={resetGame}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Reset Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pattern;
