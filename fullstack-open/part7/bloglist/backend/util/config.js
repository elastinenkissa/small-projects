require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_MONGODB_URL
        : process.env.MONGODB_URL;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    PORT,
    MONGODB_URL,
    NODE_ENV,
};
