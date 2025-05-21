const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  let filePath = '.' + (req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  switch(ext){
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpg'; break;
  }
  fs.readFile(filePath, (err, content) => {
    if(err){
      if(err.code === 'ENOENT'){
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));

/* WebSocket placeholder - requires 'ws' package
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
  console.log('client connected');
  ws.on('message', msg => {
    // handle message
  });
});
*/
