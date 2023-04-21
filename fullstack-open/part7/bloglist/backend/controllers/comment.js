require('express-async-errors');
const express = require('express');
const router = express.Router();

const middleware = require('../util/middleware');

const Comment = require('../models/comment');
const User = require('../models/user');
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    const comments = await Comment.find({}).populate('poster').populate('blog');
    res.status(200).json(comments);
});

router.post('/', middleware.getUser, async (req, res) => {
    const authorizedUser = req.user;
    if (!authorizedUser.id) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    const user = await User.findById(authorizedUser.id)
    const blog = await Blog.findById(req.body.blogId)

    const comment = new Comment({
        content: req.body.content,
        poster: user._id,
        blog: blog._id
    });
    const newComment = await comment.save()

    user.comments = user.comments.concat(newComment._id)
    await user.save()

    blog.comments = blog.comments.concat(newComment._id)
    await blog.save()

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
});

module.exports = router;
