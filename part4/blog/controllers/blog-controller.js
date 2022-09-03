const express = require("express");

const router = express.Router();

const Blog = require("../models/blog");

router.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  }).catch(error => {
    res.send(error)
  });
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((newBlog) => {
    res.status(201).json(newBlog);
  });
});

module.exports = router