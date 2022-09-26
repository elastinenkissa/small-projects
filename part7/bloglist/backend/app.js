require('express-async-errors');
const express = require('express');
const cors = require('cors');

const blogRoute = require('./controllers/blog');
const userRoute = require('./controllers/user');
const commentRoute = require('./controllers/comment')

const middleware = require('./util/middleware');
const database = require('./util/database-connection');
const config = require('./util/config')

const app = express();

database.connect();

app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);

app.use(middleware.getToken);

app.use('/api/blogs', blogRoute);

app.use('/api/users', userRoute);

app.use('/api/comments', commentRoute)

if (config.NODE_ENV === 'test') {
    const testRoute = require('./controllers/test')
    app.use('/api/tests', testRoute)
}

app.use(middleware.errorHandler);

module.exports = app;
