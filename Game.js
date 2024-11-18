import React, { useState, useEffect } from "react";
import GameGrid from "./GameGrid.js";
import "./styles.css"; 

function Game() {
   const [moves, setMoves] = useState(new Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   const [gameOver, setGameOver] = useState(false);
   const [message, setMessage] = useState("");

   const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
   ];

   function checkGameOver(updatedMoves) {
      for (const [a, b, c] of winningCombinations) {
         if (updatedMoves[a] && updatedMoves[a] === updatedMoves[b] && updatedMoves[a] === updatedMoves[c]) {
            setGameOver(true);
            setMessage(`${updatedMoves[a]} wins!`);
            return true;
         }
      }
      if (!updatedMoves.includes("")) {
         setGameOver(true);
         setMessage("It's a tie!");
         return true;
      }
      return false;
   }

   function gridClick(whichSquare) {
      if (gameOver || moves[whichSquare] !== "" || turn === "O") return;

      const movesCopy = [...moves];
      movesCopy[whichSquare] = turn;
      setMoves(movesCopy);

      if (!checkGameOver(movesCopy)) {
         setTurn("O");
      }
   }

   function makeComputerMove() {
      const movesCopy = [...moves];

      // Look for winning or blocking moves
      for (const [a, b, c] of winningCombinations) {
         const line = [movesCopy[a], movesCopy[b], movesCopy[c]];
         if (line.filter(val => val === "O").length === 2 && line.includes("")) {
            const index = [a, b, c][line.indexOf("")];
            movesCopy[index] = "O";
            setMoves(movesCopy);
            if (!checkGameOver(movesCopy)) setTurn("X");
            return;
         }
         if (line.filter(val => val === "X").length === 2 && line.includes("")) {
            const index = [a, b, c][line.indexOf("")];
            movesCopy[index] = "O";
            setMoves(movesCopy);
            if (!checkGameOver(movesCopy)) setTurn("X");
            return;
         }
      }

      // Make a random move
      const emptySquares = movesCopy.map((val, idx) => (val === "" ? idx : null)).filter(idx => idx !== null);
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      movesCopy[randomIndex] = "O";
      setMoves(movesCopy);
      if (!checkGameOver(movesCopy)) setTurn("X");
   }

   useEffect(() => {
      if (turn === "O" && !gameOver) {
         setTimeout(makeComputerMove, 500); // Delay to simulate thinking
      }
   }, [turn]);

   function newGame() {
      setMoves(new Array(9).fill(""));
      setTurn("X");
      setGameOver(false);
      setMessage("");
   }

   return (
      <>
         <h1>Tic-Tac-Toe</h1>
         <GameGrid moves={moves} click={gridClick} />
         <p>{gameOver ? message : `Turn: ${turn}`}</p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;
