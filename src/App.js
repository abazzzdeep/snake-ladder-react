import React, { useState } from "react";
import Board from "./components/Board";
import Dice from "./components/Dice";
import PlayerInfo from "./components/PlayerInfo";
import { generateSnakesAndLadders } from "./utils/randomization";
import "./App.css";

const App = () => {
  const [snakesAndLadders, setSnakesAndLadders] = useState(generateSnakesAndLadders());
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const startGame = () => {
    const newPlayers = Array.from({ length: numPlayers }, (_, index) => ({
      id: index + 1,
      position: 0,
      color: ["red", "blue", "green", "yellow", "purple"][index],
      offset: index * 10, // Offset pawns to prevent overlap
    }));
    setPlayers(newPlayers);
    setCurrentPlayer(0);
    setDiceRoll(null);
    setSnakesAndLadders(generateSnakesAndLadders());
  };

  const rollDice = () => {
    setIsRolling(true); // Start rolling animation
    const roll = Math.floor(Math.random() * 6) + 1;
  
    setTimeout(() => {
      setDiceRoll(roll); // Set the rolled number
      setIsRolling(false); // Stop rolling animation
      animatePawnMovement(roll); // Move the pawn
    }, 2000); // Duration of dice rolling animation (e.g., 2 seconds)
  };
  
  

  const animatePawnMovement = (roll) => {
    const player = players[currentPlayer];
    let newPosition = player.position;
    let steps = 0;

    const interval = setInterval(() => {
      if (steps < roll) {
        newPosition += 1;
        steps += 1;

        // Update the player's position incrementally
        const updatedPlayers = players.map((p) =>
          p.id === player.id ? { ...p, position: newPosition } : p
        );
        setPlayers(updatedPlayers);
      } else {
        clearInterval(interval);
        handleSnakesAndLadders(newPosition);
      }
    }, 300);
  };

  const handleSnakesAndLadders = (position) => {
    const player = players[currentPlayer];
    let newPosition = position;

    snakesAndLadders.snakes.forEach((snake) => {
      if (snake.head === newPosition) newPosition = snake.tail;
    });
    snakesAndLadders.ladders.forEach((ladder) => {
      if (ladder.bottom === newPosition) newPosition = ladder.top;
    });

    const updatedPlayers = players.map((p) =>
      p.id === player.id ? { ...p, position: newPosition } : p
    );
    setPlayers(updatedPlayers);

    if (newPosition >= 100) {
      setTimeout(() => {
        alert(`Player ${player.id} wins!`);
        resetGame();
      }, 500);
    } else {
      setTimeout(() => {
        setIsRolling(false);
        setCurrentPlayer((currentPlayer + 1) % players.length);
      }, 500);
    }
  };

  const resetGame = () => {
    setPlayers(players.map((p) => ({ ...p, position: 0 })));
    setCurrentPlayer(0);
    setDiceRoll(null);
    setSnakesAndLadders(generateSnakesAndLadders());
    setIsRolling(false);
  };

  if (players.length === 0) {
    return (
      <div className="player-selection">
        <h1>Snakes and Ladders</h1>
        <h2>Select Number of Players</h2>
        <div className="buttons">
          {[2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => {
                setNumPlayers(num);
                setSelectedPlayer(num);
              }}
              className={`player-button ${
                selectedPlayer === num ? "selected" : ""
              }`}
            >
              {num} Players
            </button>
          ))}
        </div>
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Snakes and Ladders</h1>
      <div className="game-container">
        <Board snakesAndLadders={snakesAndLadders} players={players} />
        <div className="sidebar">
          <PlayerInfo players={players} currentPlayer={currentPlayer} diceRoll={diceRoll} />
          <div className="dice-container">
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="dice-button"
            >
              {isRolling ? "Rolling..." : "Roll Dice"}
            </button>
          </div>
          <button onClick={resetGame} className="reset-button">
            Restart Game
          </button>
          <div className="legend">
            <h4>Legend</h4>
            <div className="item">
              <span className="ladder"></span>
              <span>Ladders</span>
            </div>
            <div className="item">
              <span className="snake"></span>
              <span>Snakes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
