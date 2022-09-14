const Blog = ({blog}) => (
  <div>
    {blog.title} - <strong>{blog.author.name}</strong>
  </div>  
)

export default Blog