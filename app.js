require('express-async-errors')
const express = require('express');
const cors = require('cors');

const blogRoute = require('./controllers/blog');
const userRoute = require('./controllers/user')

const middleware = require('./util/middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);

app.use('/api/blogs', blogRoute);

app.use('/api/users', userRoute)

app.use(middleware.errorHandler);

module.exports = app;
