describe('error handling spec', () => {
  it('should display an image for bad routes, and visitng result page without a quiz being taken', () => {
    cy.checkBadRoute('/')
    cy.checkBadRoute('/quiz/')
    cy.checkBadRoute('/saved-pets/')
    cy.checkBadRoute('/results/')
    cy.visit('http://localhost:3000/results')
      .get('img[alt="kitten and puppy holding up a sign that says Whoops! Please take the quiz first to find your pawfect match!"]').should('be.visible')
      .get('a').contains('Start the quiz!').click()
      .url().should('eq', 'http://localhost:3000/quiz')
  })

  it('should display an error message', () => {
    cy.testError(false, 400, 0)
    cy.testError(false, 400, 1)
    cy.testError(false, 400, 2)
    cy.testError(true, 400)
    cy.testError(false, 500, 0)
    cy.testError(false, 500, 1)
    cy.testError(false, 500, 2)
    cy.testError(true, 500)
  })
})