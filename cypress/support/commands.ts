// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable {
    navigate(button:string, url:string): Chainable<JQuery<HTMLElement>>
    chooseRange(range:number, answer:string): Chainable<JQuery<HTMLElement>>
    clickButton(button:string): Chainable<JQuery<HTMLElement>>
    takeQuiz(animal:string, ratings: {rating: number, answer:string}[]): Chainable<JQuery<HTMLElement>>
    restartQuiz(): Chainable<JQuery<HTMLElement>>
  }
}

Cypress.Commands.add('navigate', (button, url) => {
  cy.get('a').contains(button).click()
  .url().should('eq', `http://localhost:3000${url}`)
})

Cypress.Commands.add('chooseRange', (range: number, answer: string) => {
  cy.get('input[type="range"]').invoke('val', range)
  .get('input[type="range"]').should('have.value', range)
  .get(`#marker${range}`).click()
  .get('.rating-answer > p').contains(answer)
})

Cypress.Commands.add('clickButton', (button:string) => {
  cy.get('button').contains(button).click()
})

Cypress.Commands.add('takeQuiz', (animal:string, ratings: {rating: number, answer:string}[]) => {
  let selectedOrder = ['last', 'last', 'first']
  if(animal === 'cat') selectedOrder = ['first', 'first', 'last']
  cy.get('.question').contains('Are you looking for your soul-meow or your bark-mate?')
    .get('.pet-choice')[selectedOrder[0]]().click()
    .get('.pet-choice')[selectedOrder[1]]().should('have.class', 'selected')
    .get('.pet-choice')[selectedOrder[2]]().should('not.have.class', 'selected')
    .clickButton('Next Question')
    ratings.forEach((rating, i) => {
      cy.chooseRange(rating.rating, rating.answer)
      i < ratings.length - 1 ? cy.clickButton('Next Question') : cy.get('button').contains('Submit Quiz!') 
    })
})

Cypress.Commands.add('restartQuiz', () => {
  cy.get('.back-btn').click()
    .get('.back-btn').click()
    .get('.back-btn').click()
})