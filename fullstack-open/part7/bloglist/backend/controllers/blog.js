require('express-async-errors');
const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');
const User = require('../models/user');

const middleware = require('../util/middleware');

router.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user').populate('comments');
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
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0,
        user: user._id,
    });
    const newBlog = await blog.save();
    console.log(user)
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    const blogWithUserName = await Blog.findById(newBlog.id).populate('user');
    res.status(201).json(blogWithUserName);
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

    const blogAuthor = blog.user.toString();
    const requestingUser = authorizedUser.id;

    if (blogAuthor !== requestingUser) {
        return res.status(401).json({ error: 'Unauthorized.' });
    }

    await Blog.findByIdAndRemove(req.params.id);
    const user = await User.findById(authorizedUser.id)
    user.blogs = user.blogs.filter(blog => blog.id !== req.params.id)
    user.save()
    res.status(204).json({ message: 'Blog successfully removed.' });
});

router.put('/:id', middleware.getUser, async (req, res) => {
    const authorizedUser = req.user;

    if (!authorizedUser.id) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const updatingBlog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
    };
    const updatedBlog = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        updatingBlog,
        { new: true }
    ).populate('user');
    res.status(200).json(updatedBlog);
});

module.exports = router;
