import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [seeDetails, setSeeDetails] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    setSeeDetails(!seeDetails)
  }

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLike(blog, blogObject)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
      navigate("/")
    }
  }

  if (!blog) return

  if (!seeDetails) {
    return (
      <div className="blog" data-testid="allblogs">
        <h2>{blog.title}</h2>
        <div>{blog.author}</div>
        <button className="detailsStyle" onClick={handleClick}>
          show details
        </button>
      </div>
    )
  }

  return (
    <div className="blogStyle" data-testid="allblogs">
      <div>
        <h2>{blog.title}</h2>

        <button className="detailsStyle" onClick={handleClick}>
          hide
        </button>
      </div>
      <div> Read the article here {blog.url}</div>
      <div>
        Likes <span data-testid="likes">{blog.likes}</span>
        {user && (
          <button className="likeStyle" onClick={handleLike}>
            like
          </button>
        )}
      </div>
      <div> By {blog.author}</div>
      {user && user.id === blog.user.id ? (
        <button className="removeStyle" onClick={handleRemove}>
          remove
        </button>
      ) : null}
    </div>
  )
}

export default Blog
