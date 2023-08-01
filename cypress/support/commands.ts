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