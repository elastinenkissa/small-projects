const jwt = require('jsonwebtoken');

const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const getToken = (req, res, next) => {
  const authorization = req.get('authorization');
  const token =
    authorization && authorization.toLowerCase().startsWith('bearer ')
      ? authorization.substring(7)
      : null;
  req.token = token;
  next();
};

const getUser = (req, res, next) => {
  const user = jwt.verify(req.token, process.env.SECRET);
  req.user = user;
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
  getToken,
  getUser,
};
