require('express-async-errors');
const express = require('express');

const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/author');
const readingListRouter = require('./controllers/readingList');
const logoutRouter = require('./controllers/logout');

const { PORT } = require('./util/config');
const { connectDB } = require('./util/db');
const { errorHandler } = require('./util/middleware');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use('/api/users', userRouter);

app.use('/api/login', loginRouter);

app.use('/api/authors', authorRouter);

app.use('/api/readinglists', readingListRouter);

app.use('api/logout', logoutRouter);

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
