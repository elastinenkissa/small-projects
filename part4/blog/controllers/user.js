const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

require('express-async-errors');

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

router.post('/login', async (req, res) => {
    const loginInfo = {
        username: req.body.username,
        password: req.body.password,
    };

    const user = await User.findOne({ username: loginInfo.username });
    const passwordMatch = await bcrypt.compare(
        loginInfo.password,
        user.password
    );

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password.' });
    }

    const tokenUser = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(tokenUser, process.env.SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
