const createApp = require('./src/app');

const PORT = process.env.PORT || 3000;
const { app, server } = createApp();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
