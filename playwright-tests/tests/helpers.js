const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "Log in here" }).click()
  await page.getByLabel("username").fill(username)
  await page.getByLabel("password").fill(password)
  await page.getByRole("button", { name: "login" }).click()
}

const createUser = async (request, name, username, password) => {
  await request.post("/api/users", {
    data: {
      name: name,
      username: username,
      password: password,
    },
  })
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "Post a new blog here!" }).click()
  await page.getByLabel("title").fill(title)
  await page.getByLabel("author").fill(author)
  await page.getByLabel("url").fill(url)
  await page.getByRole("button", { name: "Post" }).click()
}

export { loginWith, createUser, createBlog }
