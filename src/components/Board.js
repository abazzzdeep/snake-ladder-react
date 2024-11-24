import React from "react";
import "./Board.css";

const Board = ({ snakesAndLadders, players }) => {
  const getCellPosition = (cellNumber) => {
    const row = Math.floor((cellNumber - 1) / 10);
    const col = (cellNumber - 1) % 10;
    const isEvenRow = row % 2 === 0;
    const x = isEvenRow ? col * 50 + 25 : (9 - col) * 50 + 25;
    const y = (9 - row) * 50 + 25;
    return [x, y];
  };

  const renderSnakesAndLadders = () => {
    const { snakes, ladders } = snakesAndLadders;

    return (
      <svg className="snakes-and-ladders" viewBox="0 0 500 500">
        {/* Render snakes */}
        {snakes.map((snake, index) => {
          const [headX, headY] = getCellPosition(snake.head);
          const [tailX, tailY] = getCellPosition(snake.tail);

          return (
            <path
              key={`snake-${index}`}
              d={`M${headX},${headY} Q${(headX + tailX) / 2},${
                (headY + tailY) / 2 - 50
              } ${tailX},${tailY}`}
              className="snake-path"
            />
          );
        })}

        {/* Render ladders */}
        {ladders.map((ladder, index) => {
          const [bottomX, bottomY] = getCellPosition(ladder.bottom);
          const [topX, topY] = getCellPosition(ladder.top);

          return (
            <line
              key={`ladder-${index}`}
              x1={bottomX}
              y1={bottomY}
              x2={topX}
              y2={topY}
              className="ladder-line"
            />
          );
        })}
      </svg>
    );
  };

  const renderPlayers = () => {
    return players.map((player) => {
      const [x, y] = getCellPosition(player.position);
      return (
        <div
          key={player.id}
          className="player"
          style={{
            backgroundColor: player.color,
            transform: `translate(${x}px, ${y}px)`,
          }}
        ></div>
      );
    });
  };

  const renderGrid = () => {
    const cells = [];
    for (let row = 9; row >= 0; row--) {
      const isEvenRow = row % 2 === 0;
      for (let col = 0; col < 10; col++) {
        const number = isEvenRow
          ? row * 10 + col + 1
          : row * 10 + (9 - col) + 1;
        cells.push(
          <div key={number} className="cell">
            {number}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="board-container">
      {renderSnakesAndLadders()}
      <div className="players-layer">{renderPlayers()}</div>
      <div className="board">{renderGrid()}</div>
    </div>
  );
};

export default Board;
