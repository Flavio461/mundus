// Core game loop placeholder
const { generateWorld } = require('./world');

function createGame() {
  const world = generateWorld();
  const players = new Map();

  function addPlayer(id) {
    players.set(id, { id, position: { x: 0, y: 0 }, stats: {} });
  }

  return { world, players, addPlayer };
}

module.exports = { createGame };
