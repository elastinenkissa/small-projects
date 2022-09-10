const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

require('express-async-errors')

router.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs');
    res.status(200).json(users);
});

router.post('/', async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: password,
    });

    if (req.body.password.length < 3) {
        res.status(400).json({
            error: 'Password must be at least 3 characters long.',
        });
        return;
    }

    const newUser = await user.save();
    res.status(201).json(newUser);
});

module.exports = router;
