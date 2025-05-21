const { createGame } = require('./logic');

// Singleton game instance
const game = createGame();

module.exports = game;
