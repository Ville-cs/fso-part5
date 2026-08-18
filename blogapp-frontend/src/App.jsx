import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Login from "./components/Login"
import Logout from "./components/Logout"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./styles.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [renderBlog, setRenderBlog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [renderBlog])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      navigate("/")
      setMessage("Login successful")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.message)
      setErrorMessage("Username or password wrong")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    navigate("/")
  }

  const handleBlogPost = async (object) => {
    try {
      const postedBlog = await blogService.create(object)
      setBlogs(blogs.concat(postedBlog))
      setRenderBlog(!renderBlog)
      setMessage("Blog submitted!")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.message)
      setErrorMessage("Some fields missing")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    await blogService.remove(blog.id)
    setRenderBlog(!renderBlog)
    setMessage("Blog deleted!")
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addLike = async (blog, blogObject) => {
    await blogService.update(blog.id, blogObject)
    setRenderBlog(!renderBlog)
    setMessage("Liked blog!")
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const match = useMatch("/:id")
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        {user ? (
          <span>
            <Link style={padding} to="/new">
              add blog
            </Link>
            <Link style={padding} to="/" onClick={handleLogout}>
              logout
            </Link>
          </span>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              errorMessage={errorMessage}
              message={message}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              deleteBlog={deleteBlog}
              addLike={addLike}
            />
          }
        />
        <Route
          path="/new"
          element={<BlogForm handleBlogPost={handleBlogPost} />}
        />
        <Route
          path="/login"
          element={
            <Login
              errorMessage={errorMessage}
              message={message}
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
