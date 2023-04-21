require('express-async-errors');
const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');
const User = require('../models/user');

const middleware = require('../util/middleware');

router.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('author');
    res.status(200).json(blogs);
});

router.post('/', middleware.getUser, async (req, res) => {
    const authorizedUser = req.user;
    if (!authorizedUser.id) {
        return res.status(401).json({ error: 'Invalid token.' });
    }

    const user = await User.findById(authorizedUser.id);

    const blog = new Blog({
        title: req.body.title,
        author: user._id,
        url: req.body.url,
        likes: req.body.likes || 0,
    });
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.status(201).json(newBlog);
});

router.delete('/:id', middleware.getUser, async (req, res) => {
    const authorizedUser = req.user;

    if (!authorizedUser.id) {
        return res.status(401).json({ error: 'Invalid token.' });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ error: 'Blog is already removed.' });
    }

    const blogAuthor = blog.author.toString();
    const requestingUser = authorizedUser.id;

    if (blogAuthor !== requestingUser) {
        return res.status(401).json({ error: 'Unauthorized.' });
    }

    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).json({ message: 'Blog successfully removed.' });
});

router.put('/:id', async (req, res) => {
    const updatingBlog = {
        ...req.body,
        likes: req.body.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updatingBlog,
        { new: true }
    );
    res.status(200).json(updatedBlog);
});

module.exports = router;
