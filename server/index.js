const express = require('express');
const http = require('http');
const path = require('path');
// Optional WebSocket placeholder
// const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback to index.html for root route
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const server = http.createServer(app);

/* WebSocket placeholder
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {
    // Handle messages here
  });
});
*/

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
