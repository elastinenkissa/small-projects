const mongoose = require('mongoose');

const config = require('../util/config');
const logger = require('../util/logger');

const url = config.MONGODB_URL;

mongoose
    .connect(url)
    .then(() => logger.info('Connected'))
    .catch((error) => logger.error(error.message));

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    url: {
        type: String,
        required: true,
    },
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString();
        delete object._id;
        delete object.__v;
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
