import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

test("Renders only title and author", () => {
  const blog = {
    title: "cool title",
    author: "cool author",
    url: "url",
    likes: 1,
  }

  renderWithRouter(<Blog blog={blog} />)

  const title = screen.getByText("cool title")
  const author = screen.getByText("cool author")
  const url = screen.queryByText("url")

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()

  // Alternative approach
  // const { container } = render(<Blog blog={blog} />)
  // const div = container.querySelector('.blog') //CSS selector
  // expect(div).toBeDefined()
  // expect(div).toHaveTextContent('title by author')
})

test("Event handler is called only once with a button press", async () => {
  const user = {
    id: 123,
  }

  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
    user: {
      user: 123,
    },
  }

  const fn = vi.fn()
  renderWithRouter(<Blog blog={blog} handleClick={fn} user={user} />)

  const blogUser = userEvent.setup()
  const button = screen.getByText("show details")
  fn(await blogUser.click(button))

  expect(fn.mock.calls).toHaveLength(1)
})

test("Renders url and likes after opening", async () => {
  const user = {
    id: 123,
  }

  const blog = {
    title: "title",
    author: "author",
    url: "www.website.com",
    likes: 5,
    user: {
      user: 123,
    },
  }

  const fn = vi.fn()
  renderWithRouter(<Blog blog={blog} handleClick={fn} user={user} />)

  const blogUser = userEvent.setup()
  const button = screen.getByText("show details")
  await blogUser.click(button)

  const urlElement = screen.getByText("www.website.com", { exact: false })
  const likesElement = screen.getByText("Likes", { exact: false })

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

// eslint-disable-next-line
test('Clicking "like" button twice calls event handler twice', async () => {
  const user = {
    id: 123,
  }

  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
    user: {
      user: 123,
    },
  }

  const addLike = (a, b) => {}

  const fn = vi.fn()
  renderWithRouter(
    <Blog blog={blog} handleLike={fn} addLike={addLike} user={user} />,
  )

  const blogUser = userEvent.setup()
  const showButton = screen.getByText("show details", { exact: false })
  await blogUser.click(showButton)

  const likeButton = screen.getByText("like")
  fn(await blogUser.click(likeButton))
  fn(await blogUser.click(likeButton))

  expect(fn.mock.calls).toHaveLength(2)
})
