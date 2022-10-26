const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Blog, attributes: { exclude: ['userId'] } },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
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
