import React from "react";
import diceGif from "../dice-rolling.gif"; // Import the dice GIF

const Dice = ({ rollDice, isRolling, diceRoll }) => {
  return (
    <div className="dice-container">
      {isRolling ? (
        <img
          src={diceGif}
          alt="Rolling Dice"
          className="dice-gif"
        />
      ) : (
        <div className="dice-result">
          <span>{diceRoll}</span>
        </div>
      )}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className="dice-button"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;
