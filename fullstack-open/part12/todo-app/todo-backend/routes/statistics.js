const express = require('express');
const router = express.Router();
const redis = require('../redis');

router.get('/', async (req, res) => {
  const count = await redis.getAsync('todoCount');
  const addedTodos = { added_todos: count ? count : 0 };
  res.send(addedTodos);
});

module.exports = router;
