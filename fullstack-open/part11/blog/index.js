const http = require('http');
const app = require('./app');
const config = require('./util/config');
const logger = require('./util/logger');

const server = http.createServer(app);

const PORT = config.PORT;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
