import { useState } from "react"

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [seeDetails, setSeeDetails] = useState(false)

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
    }
  }

  if (!seeDetails) {
    return (
      <div className="blog" data-testid="allblogs">
        {blog.title} by {blog.author}
        <button className="detailsStyle" onClick={handleClick}>
          show details
        </button>
      </div>
    )
  }

  return (
    <div className="blogStyle" data-testid="allblogs">
      <div>
        {blog.title}
        <button className="detailsStyle" onClick={handleClick}>
          hide
        </button>
      </div>
      <div> Read the article here {blog.url}</div>
      <div>
        Likes <span data-testid="likes">{blog.likes}</span>
        <button className="likeStyle" onClick={handleLike}>
          like
        </button>
      </div>
      <div> By {blog.author}</div>
      {user.id === blog.user.id ? (
        <button className="removeStyle" onClick={handleRemove}>
          remove
        </button>
      ) : null}
    </div>
  )
}

export default Blog
