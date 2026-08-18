import Notification from "./Notification"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { Link } from "react-router-dom"

const BlogList = ({
  blogs,
  errorMessage,
  message,
  blogFormRef,
  handleBlogPost,
}) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorMessage={errorMessage} message={message} />
      <h2>Create a new blog</h2>
      <Togglable buttonLabel="Post a new blog here!" ref={blogFormRef}>
        <BlogForm handleBlogPost={handleBlogPost} />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
