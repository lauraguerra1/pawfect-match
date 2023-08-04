describe('saved pets spec', () => {
  it('should visit the saved pets and see a placeholder', () => {
    cy.visit('http://localhost:3000/saved-pets')
      .get('h1').contains('Your Pawfect Matches')
      .get('h2').contains('No pets saved yet! Take the quiz to find a match!')
      .get('.no-saved > img').should('be.visible')
  })

  it('should take the quiz and save the pet, unsave a pet, and know if a quiz result is saved', () => {
    cy.visit('http://localhost:3000/quiz')
    const queries = ['protectiveness', 'shedding', 'energy', 'family_friendly', 'shedding', 'playfulness']
    queries.forEach((query, i) => {
      const animal = i <= 2 ? 'dog' : 'cat'
      cy.stubSingleFetch(`${animal}s?${query}=${i > 2 ? i : i+1}`, `${animal}${i+1}`, 200)
    })
    cy.takeQuiz('dog', [
      {rating:1, answer: 'I am loyal to no one.'}, 
      {rating:2, answer: 'I only clean up when I have guests.'},
      {rating:3, answer: 'I can be energetic, but I also like to relax.'}, 
    ])
    .get('.next-btn').contains('Submit Quiz!').click()
    .wait(['@dog1', '@dog2', '@dog3']).then((interception) => {
      cy.get('a').contains('Add to My Pets').find('img[alt="save button"]').click()
      .url().should('eq', 'http://localhost:3000/saved-pets')
      .get('.pet').should('have.length', 1).contains('h2', 'Australian Cattle Dog')
      .get('img[alt="Australian Cattle Dog"]').should('be.visible')
      .get('.bookmark-button').should('be.visible')
    })
    cy.get('a').contains('Quiz').click()
    cy.takeQuiz('cat', [
      {rating:3, answer: 'Sometimes. I\'m not a hermit, but I\'m no party animal either.'}, 
      {rating:4, answer: 'I keep things tidy, and if something gets messy I can clean it up.'},
      {rating:5, answer: 'I LOVE SNUGGLES!'}, 
    ])  
    .get('.next-btn').contains('Submit Quiz!').click()
    .wait(['@cat4', '@cat5', '@cat6']).then((interception) => {
      cy.get('a').contains('Add to My Pets').click()
      .url().should('eq', 'http://localhost:3000/saved-pets')
      .get('.saved-pets').scrollTo('bottom')
      .get('.pet').should('have.length', 2).last().contains('h2', 'American Shorthair')
      .get('img[alt="American Shorthair"]').should('be.visible')
      .get('.bookmark-button').last().should('be.visible').click()
      .get('dialog').contains('Are you sure you want to remove the American Shorthair from your pets?').should('be.visible')
      .clickButton('CANCEL')
      .get('dialog').should('not.be.visible')
      .get('.bookmark-button').last().click()
      .clickButton('REMOVE PET')
      .get('dialog').should('not.be.visible')
      .get('.pet').should('have.length', 1)
    })
    cy.get('a').contains('Quiz').click()
    cy.takeQuiz('dog', [
      {rating:1, answer: 'I am loyal to no one.'}, 
      {rating:2, answer: 'I only clean up when I have guests.'},
      {rating:3, answer: 'I can be energetic, but I also like to relax.'}, 
    ])
    .get('.next-btn').contains('Submit Quiz!').click()
    .wait(['@dog1', '@dog2', '@dog3']).then((interception) => {
      cy.get('.heading-top').contains('WOW! This match is truly pawfect!')
      .get('p').contains('The Australian Cattle Dog is already in your pets and you\'ve been matched again!')
      .get('a').contains('Return To Quiz').should('be.visible')
      .get('a').contains('View My Pets').should('be.visible').click()
      .url().should('eq', 'http://localhost:3000/saved-pets')
    })
  })
})