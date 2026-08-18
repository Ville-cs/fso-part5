// Tests for chapter d: End to end testing

// const { test, expect, beforeEach, describe } = require("@playwright/test")
// const { loginWith, createUser, createBlog } = require("./helpers")

// const title = "The Lord of the Rings"
// const author = "J.R.R Tolkien"
// const url = "www.lotr.com"

// describe("Blog app", () => {
//   beforeEach(async ({ page, request }) => {
//     await request.post("/api/testing/reset")
//     await createUser(request, "test name", "test username", "test password")
//     await page.goto("/")
//   })

//   describe("Login", () => {
//     test("Login form is shown", async ({ page }) => {
//       const loginText = page.getByText("Login to see blogs")
//       await expect(loginText).toBeVisible()
//     })

//     test("succees with correct credentials", async ({ page }) => {
//       await loginWith(page, "test username", "test password")
//       const successNotification = page.getByText("Login successful")
//       await expect(successNotification).toBeVisible()
//     })

//     test("fails with wrong credentials", async ({ page }) => {
//       await loginWith(page, "incorrect", "credentials")
//       const failureNotification = page.getByText("Username or password wrong")
//       await expect(failureNotification).toBeVisible()
//     })
//   })

//   describe("When logged in", () => {
//     beforeEach(async ({ page }) => {
//       await loginWith(page, "test username", "test password")
//     })

//     test("a new blog can be created", async ({ page }) => {
//       await createBlog(page, title, author, url)
//       const createdBlog = page.getByText(
//         "The Lord of the Rings by J.R.R Tolkien",
//       )
//       await expect(createdBlog).toBeVisible()
//     })

//     describe("blog actions", () => {
//       beforeEach(async ({ page }) => {
//         await createBlog(page, title, author, url)
//       })

//       test("a blog can be liked", async ({ page }) => {
//         await page.getByRole("button", { name: "show details" }).click()
//         await expect(page.getByText("Likes 0")).toBeVisible()
//         await page.getByRole("button", { name: "like" }).click()
//         await expect(page.getByText("Likes 1")).toBeVisible()
//       })

//       test("a user can delete their own blog", async ({ page }) => {
//         await page.getByRole("button", { name: "show details" }).click()
//         page.on("dialog", (dialog) => dialog.accept())
//         await page.getByRole("button", { name: "remove" }).click()
//         await expect(page.getByText("Blog deleted!")).toBeVisible()
//       })

//       test("a user cannot delete another's blog", async ({ page, request }) => {
//         await page.getByText(title).waitFor()
//         await page.getByRole("button", { name: "logout" }).click()
//         await createUser(
//           request,
//           "another name",
//           "another username",
//           "another password",
//         )
//         await loginWith(page, "another username", "another password")
//         await page.getByRole("button", { name: "show details" }).click()
//         const removeButton = page.getByRole("button", { name: "remove" })
//         await expect(removeButton).not.toBeVisible()
//       })
//     })

//     test("blogs appear in order of most likes", async ({ page }) => {
//       await createBlog(page, "has most likes", author, url)
//       await createBlog(page, "has second most likes", author, url)
//       await page.getByText("has second most likes").waitFor()

//       const blogs = page.getByTestId("allblogs")

//       for (const blog of await blogs.all()) {
//         await blog.getByRole("button", { name: "show details" }).click()
//         const likes = blog.getByTestId("likes")
//         if ((await blog.innerText()).includes("has most likes")) {
//           await blog.getByRole("button", { name: "like" }).click()
//           await expect(likes).toHaveText("1")
//           await blog.getByRole("button", { name: "like" }).click()
//           await expect(likes).toHaveText("2")
//           await blog.getByRole("button", { name: "like" }).click()
//           await expect(likes).toHaveText("3")
//         }
//         if ((await blog.innerText()).includes("has second most likes")) {
//           await blog.getByRole("button", { name: "like" }).click()
//           await expect(likes).toHaveText("1")
//           await blog.getByRole("button", { name: "like" }).click()
//           await expect(likes).toHaveText("2")
//         }
//       }

//       let previous = null
//       for (const blog of await blogs.all()) {
//         const likes = await blog.getByTestId("likes").innerText()
//         if (!previous) previous = likes
//         else {
//           expect(parseInt(previous)).toBeGreaterThanOrEqual(parseInt(likes))
//         }
//       }
//     })
//   })
// })
