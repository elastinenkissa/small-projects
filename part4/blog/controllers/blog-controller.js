const express = require('express');

const router = express.Router();

const Blog = require('../models/blog');

router.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
});

router.post('/', async (req, res) => {
    const blog = new Blog({
        ...req.body,
        likes: req.body.likes || 0,
    });
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
});

module.exports = router;
