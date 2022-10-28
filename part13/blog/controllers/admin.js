const express = require('express');
const { User } = require('../models');
const { getUser } = require('../util/middleware');
const router = express.Router();

router.put('/:id', getUser, async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await User.findByPk(req.params.id);
  user.disabled = req.body.disabled;
  await user.save();

  res.status(204).json({ message: 'User status changed' });
});
