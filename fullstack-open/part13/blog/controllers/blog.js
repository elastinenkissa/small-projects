const express = require('express');
const { Op } = require('sequelize');
const { Blog, User } = require('../models');
const { getUser, getSession } = require('../util/middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
      },
    ],
    attributes: { exclude: ['userId'] },
    where,
    order: [['likes', 'DESC']],
  });

  if (!blogs) {
    return res.status(404).json({ message: 'No blogs found' });
  }

  res.status(200).json(blogs);
});

router.post('/', getUser, getSession, async (req, res) => {
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(401).json({ error: 'Session expired' });
  }

  const newBlog = await Blog.create({ ...req.body, userId: user.id });

  res.status(201).json(newBlog);
});

router.delete('/:id', getUser, getSession, async (req, res) => {
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(401).json({ error: 'Session expired' });
  }

  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: 'Blog does not exist' });
  }

  if (blog.userId !== user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await blog.destroy();

  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const likedBlog = await Blog.findByPk(req.params.id);

  if (!likedBlog) {
    return res.status(404).json({ error: 'Blog does not exist' });
  }

  likedBlog.likes = likedBlog.likes + 1;
  await likedBlog.save();
  res.status(204).json({ likes: likedBlog.likes });
});

module.exports = router;
