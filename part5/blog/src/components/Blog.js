const Blog = ({blog}) => (
  <div>
    {blog.title} - <strong>{blog.author.name ? blog.author.name : "anonymous"}</strong>
  </div>  
)

export default Blog