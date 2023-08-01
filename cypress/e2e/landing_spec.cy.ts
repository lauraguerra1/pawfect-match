describe('template spec', () => {

  it('should have a homepage and navigate via the navbar', () => {
    cy.visit('http://localhost:3000')
      .get('h1').contains('Take the quiz to find your pawfect match!')
      .get('img[alt="grey kitty giving a kiss to a puppy golden retriver"]')
      .get('a').contains('Start the quiz!').click()
      .url().should('eq', 'http://localhost:3000/quiz')
      .get('.active').contains('Quiz')
      .get('a').contains('Home').click()
      .url().should('eq', 'http://localhost:3000/')
      .get('.active').contains('Home')
      .get('a').contains('My Pets').click()
      .url().should('eq', 'http://localhost:3000/saved-pets')
      .get('.logo').click()
      .url().should('eq', 'http://localhost:3000/')
  })
})