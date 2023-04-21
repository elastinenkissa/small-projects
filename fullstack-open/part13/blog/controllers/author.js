const express = require('express');
const { Blog } = require('../models');
const { sequelize } = require('../util/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC']],
  });

  if (!authors) {
    return res.status(404).json({ message: 'No authors found' });
  }

  res.status(200).json(authors);
});

module.exports = router;
