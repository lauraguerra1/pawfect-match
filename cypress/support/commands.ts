type Answer = {
  answer: string,
  value: string
}

type Question = {
  question: string,
  query: string;
  answers: Answer[]
}

declare namespace Cypress {
  interface Chainable {
    navigate(button:string, url:string): Chainable<JQuery<HTMLElement>>
    chooseRange(range:number, answer:string): Chainable<JQuery<HTMLElement>>
    clickButton(button:string): Chainable<JQuery<HTMLElement>>
    takeQuiz(animal:string, ratings: {rating: number, answer:string}[]): Chainable<JQuery<HTMLElement>>
    restartQuiz(): Chainable<JQuery<HTMLElement>>
    testAllAnswers(questions: Question[]): Chainable<JQuery<HTMLElement>>
    stubSingleFetch(endpoints:string, fixture:string, status:number):Chainable<JQuery<HTMLElement>>
    testError(allError: boolean, status: number, num?: number): Chainable<JQuery<HTMLElement>>
    checkBadRoute(path: string): Chainable<JQuery<HTMLElement>>
  }
}

Cypress.Commands.add('navigate', (button, url) => {
  cy.get('a').contains(button).click()
  .url().should('eq', `http://localhost:3000${url}`)
})

Cypress.Commands.add('chooseRange', (range, answer) => {
  cy.get('input[type="range"]').invoke('val', range)
  .get('input[type="range"]').should('have.value', range)
  .get(`#marker${range}`).click()
  .get('[data-cy="answer"]').contains(answer)
})

Cypress.Commands.add('clickButton', (button) => {
  cy.get('button').contains(button).click()
})

Cypress.Commands.add('takeQuiz', (animal, ratings) => {
  let selectedOrder = ['last', 'last', 'first']
  if(animal === 'cat') selectedOrder = ['first', 'first', 'last']
  cy.get('.question').contains('Are you looking for your soul-meow or your bark-mate?')
    .get('.pet-choice')[selectedOrder[0]]().click()
    .get('.pet-choice')[selectedOrder[1]]().should('have.class', 'selected')
    .get('.pet-choice')[selectedOrder[2]]().should('not.have.class', 'selected')
    .clickButton('Next Question')
    ratings.forEach((rating, i) => {
      cy.chooseRange(rating.rating, rating.answer)
      i < ratings.length - 1 ? cy.clickButton('Next Question') : cy.get('.next-btn').contains('Submit Quiz!').should('be.visible')
    })
})

Cypress.Commands.add('restartQuiz', () => {
  cy.get('.back-btn').click()
    .get('.back-btn').click()
    .get('.back-btn').click()
})

Cypress.Commands.add('testAllAnswers', (questions) => {
  questions.forEach((question, i) => {
      question.answers.forEach((answer) => {
        cy.chooseRange(parseInt(answer.value), answer.answer)
      })
    i < 2 ? cy.clickButton('Next Question') : cy.get('.next-btn').contains('Submit Quiz!').should('be.visible')
  })
})

Cypress.Commands.add('stubSingleFetch', (endpoints, fixture, status) => {
  cy.intercept('GET', `https://api.api-ninjas.com/v1/${endpoints}`, {
    statusCode: status, 
    fixture: fixture
  }).as(fixture)
})

Cypress.Commands.add('testError', (allError, status, num) => {
  cy.visit('http://localhost:3000/quiz')
  const queries = ['protectiveness', 'shedding', 'energy']
  queries.forEach((query, i) => {
    let statusCode: number;
    if (!allError) statusCode = i === num ? status : 200
    if (allError) statusCode = status
    cy.stubSingleFetch(`dogs?${query}=${i+1}`, `dog${i+1}`, statusCode)
  })
  cy.takeQuiz('dog', [
    {rating:1, answer: 'I am loyal to no one.'}, 
    {rating:2, answer: 'I only clean up when I have guests.'},
    {rating:3, answer: 'I can be energetic, but I also like to relax.'}, 
  ])
  .get('.next-btn').contains('Submit Quiz!').click()
  .wait(['@dog1', '@dog2', '@dog3']).then((interception) => {
    cy.get('img[alt="cat and dog rolling around on the floor"]').should('be.visible')
      .get('h1').contains(`Whoops! Error ${status} - Please try again!`)
  })
})