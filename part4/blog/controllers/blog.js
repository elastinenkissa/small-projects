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

router.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204);
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
