import React from "react";
import "./PlayerInfo.css";

const PlayerInfo = ({ players, currentPlayer, diceRoll }) => {
  return (
    <div className="player-info">
      <h2>Current Turn: Player {players[currentPlayer].id}</h2>
      <p>Dice Roll: {diceRoll || "-"}</p>
      {players.map((player) => (
        <div key={player.id} className="player-details">
          <span style={{ backgroundColor: player.color }} className="player-color"></span>
          Player {player.id}: {player.position}
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;
