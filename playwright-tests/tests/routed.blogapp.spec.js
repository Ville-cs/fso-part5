const { test, expect, beforeEach, describe } = require("@playwright/test")
const { loginWith, createUser, createBlog } = require("./helpers")

const title = "The Lord of the Rings"
const author = "J.R.R Tolkien"
const url = "www.lotr.com"

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await createUser(request, "test name", "test username", "test password")
    await page.goto("/")
  })

  describe("Login", () => {
    test("succees with correct credentials", async ({ page }) => {
      await loginWith(page, "test username", "test password")
      await expect(page.getByText("Login successful")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "incorrect", "credentials")
      const failureNotification = page.getByText("Username or password wrong")
      await expect(failureNotification).toBeVisible()
    })
  })

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "test username", "test password")
    })

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, title, author, url)
      const createdBlog = page.getByText(
        "The Lord of the Rings by J.R.R Tolkien",
      )
      await expect(createdBlog).toBeVisible()
    })

    describe("blog actions", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, title, author, url)
      })

      test("a blog can be liked", async ({ page }) => {
        await page.getByText("The Lord of the Rings by J.R.R Tolkien").click()
        await expect(page.getByText("Likes 0")).toBeVisible()
        await page.getByRole("button", { name: "like" }).click()
        await expect(page.getByText("Likes 1")).toBeVisible()
      })

      test("a user can delete their own blog", async ({ page }) => {
        await page.getByText("The Lord of the Rings by J.R.R Tolkien").click()
        page.on("dialog", (dialog) => dialog.accept())
        await page.getByRole("button", { name: "remove" }).click()
        await expect(page.getByText("Blog deleted!")).toBeVisible()
      })

      test("a user cannot delete another's blog", async ({ page, request }) => {
        await page.getByText("logout").click()

        await createUser(
          request,
          "another name",
          "another username",
          "another password",
        )
        await loginWith(page, "another username", "another password")
        await page.getByText("The Lord of the Rings by J.R.R Tolkien").click()
        const removeButton = page.getByRole("button", { name: "remove" })
        await expect(removeButton).not.toBeVisible()
      })
    })
  })
})
