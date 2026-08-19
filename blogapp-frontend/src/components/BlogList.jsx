import Notification from "./Notification"
import { Link } from "react-router-dom"

const BlogList = ({ blogs, notification }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
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
