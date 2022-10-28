const express = require('express');
const { ReadingList } = require('../models');
const { getUser, getSession } = require('../util/middleware');
const router = express.Router();

router.post('/', async (req, res) => {
  const readingListItem = await ReadingList.create(req.body);
  res.status(201).json(readingListItem);
});

router.put('/:id', getUser, getSession, async (req, res) => {
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(401).json({ error: 'Session expired' });
  }

  const readingListitem = await ReadingList.findByPk(req.params.id);

  if (!user.id === readingListitem.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  readingListitem.read = req.body.read;
  await readingListitem.save();

  res.status(204).json(readingListitem);
});

module.exports = router;
