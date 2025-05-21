const fs = require('fs');
const path = require('path');

function saveGame(state, filename = 'save.json') {
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(state, null, 2));
}

function loadGame(filename = 'save.json') {
  const file = path.join(__dirname, filename);
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
  return null;
}

module.exports = { saveGame, loadGame };
