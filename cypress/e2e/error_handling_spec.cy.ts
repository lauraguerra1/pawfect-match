describe('error handling spec', () => {
  it('should display an image for bad routes, and visitng result page without a quiz being taken', () => {
    cy.checkBadRoute('/')
      .checkBadRoute('/quiz/')
      .checkBadRoute('/saved-pets/')
      .checkBadRoute('/results/')
      .visit('http://localhost:3000/results')
      .get('img[alt="kitten and puppy holding up a sign that says Whoops! Please take the quiz first to find your pawfect match!"]').should('be.visible')
      .get('a').contains('Start the quiz!').click()
      .url().should('eq', 'http://localhost:3000/quiz')
  })

  it('should display an error message', () => {
    cy.testError(false, 400, 0)
      .testError(false, 400, 1)
      .testError(false, 400, 2)
      .testError(true, 400)
      .testError(false, 500, 0)
      .testError(false, 500, 1)
      .testError(false, 500, 2)
      .testError(true, 500)
      .viewport(500, 700)
      .get('.menu-btn').click()
      .get('h1').contains(`Whoops! Error 500 - Please try again!`).should('not.be.visible')
      .get('.menu').should('be.visible')
      .get('.close-menu').click()
      .get('h1').contains(`Whoops! Error 500 - Please try again!`).should('be.visible')
  })
})