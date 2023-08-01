describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/quiz')
  })

  it('should show the beginning of the quiz', () => {
    cy.get('h1').contains('Are you looking for your soul-meow or your bark-mate?')
      .get('.pet-choice').should('have.length', 2)
      .get('.pet-choice').first().should('have.class', 'selected')
      .get('.pet-choice').first().find('img[alt="cat"]')
      .get('.pet-choice').first().contains('soul-meow')
      .get('.pet-choice').last().should('not.have.class', 'selected')
      .get('.pet-choice').last().find('img[alt="dog"]')
      .get('.pet-choice').last().contains('bark-mate')
  })


})