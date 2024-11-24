export const generateSnakesAndLadders = () => {
    const snakes = [];
    const ladders = [];
  
    const getRandomPosition = () => Math.floor(Math.random() * 99) + 1;
  
    while (snakes.length < 6) {
      let head = getRandomPosition();
      let tail = getRandomPosition();
      if (head > tail && !snakes.find(s => s.head === head)) {
        snakes.push({ head, tail });
      }
    }
  
    while (ladders.length < 6) {
      let bottom = getRandomPosition();
      let top = getRandomPosition();
      if (bottom < top && !ladders.find(l => l.bottom === bottom)) {
        ladders.push({ bottom, top });
      }
    }
  
    return { snakes, ladders };
  };
  