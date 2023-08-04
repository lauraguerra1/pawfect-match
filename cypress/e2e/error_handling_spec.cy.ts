describe('error handling spec', () => {
  it('should display an image for bad routes, and visitng result page without a quiz being taken', () => {
    cy.visit('http://localhost:3000/nonsense')
      .get('img[alt="kitten and puppy holding up a sign that says Nothing to see here... Please go back!"]').should('be.visible')
      .get('a').contains('Take me Home').click()
      .url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/quiz/nonsense')
      .get('img[alt="kitten and puppy holding up a sign that says Nothing to see here... Please go back!"]').should('be.visible')
      .get('a').contains('Take me Home').click()
      .url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/saved-pets/nonsense')
      .get('img[alt="kitten and puppy holding up a sign that says Nothing to see here... Please go back!"]').should('be.visible')
      .get('a').contains('Take me Home').click()
      .url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/results/nonsense')
      .get('img[alt="kitten and puppy holding up a sign that says Nothing to see here... Please go back!"]').should('be.visible')
      .get('a').contains('Take me Home').click()
      .url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/results')
      .get('img[alt="kitten and puppy holding up a sign that says Whoops! Please take the quiz first to find your pawfect match!"]').should('be.visible')
      .get('a').contains('Start the quiz!').click()
      .url().should('eq', 'http://localhost:3000/quiz')
  })

  it('should display an error message even if only one  request fails', () => {
    cy.visit('http://localhost:3000/quiz')
    const queries = ['protectiveness', 'shedding', 'energy']
    queries.forEach((query, i) => {
      const status = i === 0 ? 400 : 200
      cy.stubSingleFetch(`dogs?${query}=${i+1}`, `dog${i+1}`, status)
    })
    cy.takeQuiz('dog', [
      {rating:1, answer: 'I am loyal to no one.'}, 
      {rating:2, answer: 'I only clean up when I have guests.'},
      {rating:3, answer: 'I can be energetic, but I also like to relax.'}, 
    ])
    .get('.next-btn').contains('Submit Quiz!').click()
  })
})