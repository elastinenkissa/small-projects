require('express-async-errors');
const express = require('express');

const blogRouter = require('./controllers/blog');

const { PORT } = require('./util/config');
const { connectDB } = require('./util/db');
const { errorHandler } = require('./util/middleware');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use(errorHandler)

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
