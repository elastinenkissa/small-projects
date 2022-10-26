const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { JWT_SECRET } = require('../util/config');

router.post('/', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.json(400).json({ error: 'Invalid username' });
  }

  const validPassword = bcrypt.compare(user.passwordHash, req.body.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET);

  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = router;
