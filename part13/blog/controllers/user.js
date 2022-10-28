const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ['userId'] } },
  });

  if (!users) {
    return res.status(404).json({ message: 'No users found' });
  }

  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  let where = {};

  if (req.query) {
    where = { ...req.query };
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      through: {
        attributes: ['id', 'read'],
        where,
      },
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({ ...req.body, passwordHash });
  res.status(201).json(newUser);
});

router.put('/:username', async (req, res) => {
  await User.update(
    { username: req.body.username },
    {
      where: {
        username: req.params.username,
      },
    }
  );
  res.status(204);
});

module.exports = router;
