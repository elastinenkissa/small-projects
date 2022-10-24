const errorHandler = (error, request, res, next) => {
  console.error(error.message);

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error });
  }

  next(error);
};

module.exports = { errorHandler };
