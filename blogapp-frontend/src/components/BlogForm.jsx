import { useState } from "react"

const BlogForm = ({ handleBlogPost }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleBlogPost({
      title: title,
      author: author,
      url: url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form id="testForm" onSubmit={handleSubmit}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
            placeholder="title of the blog"
            id="title"
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
            placeholder="author of the blog"
            id="author"
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
            placeholder="URL of the blog"
            id="url"
          />
        </label>
      </div>
      <button className="postBlog" type="submit">
        Post
      </button>
    </form>
  )
}

export default BlogForm
