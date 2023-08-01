describe('template spec', () => {

  it('should have a homepage and navigate via the navbar', () => {
    cy.visit('http://localhost:3000')
      .get('h1').contains('Take the quiz to find your pawfect match!')
      .get('img[alt="grey kitty giving a kiss to a puppy golden retriver"]')
      .navigate('Start the quiz!', '/quiz')
      .get('.active').contains('Quiz')
      .navigate('Home', '/')
      .get('.active').contains('Home')
      .navigate('My Pets', '/saved-pets')
      .get('.logo').click()
      .url().should('eq', 'http://localhost:3000/')
      .viewport(500, 750)
      .get('.menu-btn').click()
      .get('.menu').children().should('have.length', 4)
      .navigate('Home', '/')
      .get('.menu-btn').click()
      .navigate('Quiz', '/quiz')
      .get('.menu-btn').click()
      .navigate('My Pets', '/saved-pets')
      .get('.menu-btn').click()
      .navigate('Home', '/')
      .get('.menu-btn').click()
      .get('.close-menu').click()
      .get('.landing-page')
  })
})