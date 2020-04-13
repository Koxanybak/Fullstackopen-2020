describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      username: "mluukkai", password: "salainen", name: "Matti Luukkainen"
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.get(".loginForm").contains("username")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("salainen")

      cy.contains("login").click()

      cy.contains("Matti Luukkainen logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("mluukkai")
      cy.get("#password").type("wrong")

      cy.contains("login").click()

      cy.contains("wrong credentials")
      cy.get("html").should("not.contain", "Matti Luukkainen logged in")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "mluukkai", password: "salainen" })
    })

    it("A blog can be created", function() {
      cy.contains("Create a new blog").click()
      
      cy.get("#title").type("otsikko")
      cy.get("#author").type("kirjoittaja")
      cy.get("#url").type("osoite")

      cy.contains("create").click()

      cy.contains("otsikko")
      cy.contains("kirjoittaja")
    })

    describe("when there's multiple blogs", function() {
      beforeEach(function() {
        cy.createBlog({ title: "first title", author: "first author", url: "first url" })
        cy.createBlog({ title: "second title", author: "second author", url: "second url" })
        cy.createBlog({ title: "third title", author: "third author", url: "third url" })
      })
      
      it("a blog can be liked", function() {
        cy.get(".show:first").click()
        cy.get(".blog:first").should("contain", '0')
        cy.get(".like:first").click()
        cy.get(".blog:first").should("contain", '1')
      })

      it("a blog can be removed by its creator", function() {
        cy.get(".show:first").click()
        cy.get(".blog:first").find(".remove").click()
        cy.get("html").should("not.contain", "first title")
      })

      it("blogs are in a correct order", function() {
        cy.get(".show:last").click()
        cy.get(".blog:last").should("contain", '0')
        cy.get(".like:last").click()
        cy.get(".blog:first").should("contain", "third title")
      })
    })
  })
})