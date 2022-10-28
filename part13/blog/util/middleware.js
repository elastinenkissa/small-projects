const jwt = require('jsonwebtoken');
const { User, Blog, Session } = require('../models');
const { JWT_SECRET } = require('./config');

const getUser = async (req, res, next) => {
  const authorization = req.get('authorization');

  const token = authorization && authorization.split(' ')[1];

  req.token = token;

  const decodedToken = jwt.verify(token, JWT_SECRET);

  const user = await User.findByPk(decodedToken.id, {
    include: { model: Blog, attributes: { exclude: ['userId'] } },
  });

  if (user.admin) {
    req.admin = user.admin;
  }

  req.user = user;

  next();
};

const getSession = async (req, res, next) => {
  const token = req.token;

  const session = await Session.findOne({
    where: {
      token,
    },
  });

  if (session) {
    req.session = true;
  } else {
    req.session = false;
  }

  next();
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'TypeError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.errors[0].message });
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'SequelizeEagerLoadingError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler, getUser, getSession };
