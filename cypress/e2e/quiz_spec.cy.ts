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

  it('should answer quiz questions for dog then go back and answer for cat', () => {
    cy.get('.pet-choice').last().click()
      .get('.pet-choice').last().should('have.class', 'selected')
      .get('.pet-choice').first().should('not.have.class', 'selected')
      .clickButton('Next Question')
      .get('h1').contains('How loyal are you?')
      .get('.instructions').contains('slide the rating bar to change your answer')
      .chooseRange(1, 'I am loyal to no one.')
      .clickButton('Next Question')
      .chooseRange(2, 'I prefer to chill out most of the time.')
      .clickButton('Next Question')
      .chooseRange(5, 'I LOVE SNUGGLES!')
      .get('button').contains('Submit Quiz!')

      
  })
})