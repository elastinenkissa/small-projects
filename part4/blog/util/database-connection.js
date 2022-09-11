const mongoose = require('mongoose');

const logger = require('./logger');
const config = require('./config');

const url = config.MONGODB_URL;

const connect = async () => {
    await mongoose.connect(url);
    logger.info('Connected to database.');
};

module.exports = { connect };
