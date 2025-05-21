const express = require('express');
const http = require('http');
const path = require('path');
const setupWebSocket = require('./websocket');
const game = require('./game');

module.exports = function createApp() {
  const app = express();
  const server = http.createServer(app);

  // expose game state for debugging (placeholder)
  app.get('/state', (_req, res) => {
    res.json({
      players: Array.from(game.players.keys()),
      worldSeed: game.world.seed,
    });
  });

  // static files from client/dist
  app.use(express.static(path.join(__dirname, '../../client/dist')));

  // Fallback to index.html for single page apps
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });

  setupWebSocket(server);
  return { app, server };
};
