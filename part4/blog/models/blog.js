const mongoose = require("mongoose");

require("dotenv").config();

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
