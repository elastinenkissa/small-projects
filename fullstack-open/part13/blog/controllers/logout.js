const express = require('express');
const { Session } = require('../models');
const router = express.Router();

router.delete('/', async (req, res) => {
  const session = await Session.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  await session.destroy();

  res.status(204).json({ message: 'Session removed' });
});

module.exports = router;
