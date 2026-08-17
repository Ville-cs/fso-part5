describe('Blog app e2e tests', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test',
    }
    const user2 = {
      name: 'test2',
      username: 'test2',
      password: 'test2',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
  })

  it('First, login form is shown', function () {
    cy.contains('Login to see blogs')
  })

  it('succeeds with correct credentials', function () {
    cy.contains('Log in here').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
    cy.contains('Login successful')
  })

  it('fails with wrong credentials', function () {
    cy.contains('Log in here').click()
    cy.get('#username').type('wrong')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.errorStyle')
      .should('contain', 'Username or password wrong')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' })
      cy.createBlog({
        title: 'least likes',
        author: 'previous author',
        url: 'www.example.com',
      })
    })

    it('A blog can be created', function () {
      cy.contains('Post a new blog here!').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')

      cy.get('.postBlog').click()
      cy.contains('new blog')
    })

    it('blogs can be liked', function () {
      cy.get('.detailsStyle').click()
      cy.contains('Likes 0')
      cy.contains('like').click()
      cy.contains('Likes 1')
    })

    it.only('blogs are ordered by likes', function () {
      cy.createBlog({
        title: 'most likes',
        author: 'new author',
        url: 'www.blog.com',
      })
      cy.get('.blog').eq(0).should('contain', 'least likes')
      cy.get('.blog').eq(1).should('contain', 'most likes')
      cy.get('.detailsStyle:last').click()
      cy.get('.blogStyle').get('.likeStyle').click()

      cy.wait(500)
      cy.visit('http://localhost:5173')
      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', 'least likes')
    })

    describe('blog deletion', function () {
      it('a blog can be deleted by the user who added it', function () {
        cy.get('.detailsStyle').click()
        cy.contains('remove').click()

        cy.contains('Blog deleted!')
      })
      it('a blog cannot be deleted by a user who did not create it', function () {
        cy.contains('logout').click()
        cy.login({ username: 'test2', password: 'test2' })

        cy.get('.detailsStyle').click()
        cy.contains('remove').should('not.exist')
      })
    })
  })
})
