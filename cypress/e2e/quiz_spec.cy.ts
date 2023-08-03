import {dogQuestions, catQuestions} from '../../src/components/Quiz/QuizData'

describe('quiz spec', () => {
  const stubSingleFetch = (endpoints:string, fixture:string) => {
    cy.intercept('GET', `https://api.api-ninjas.com/v1/${endpoints}`, {
      statusCode: 200, 
      fixture: fixture
    }).as(fixture)
  }
  beforeEach(() => {
    cy.visit('http://localhost:3000/quiz')
  })

  it('should show the beginning of the quiz', () => {
    cy.get('.question').contains('Are you looking for your soul-meow or your bark-mate?')
      .get('.pet-choice').should('have.length', 2)
      .get('.pet-choice').first().should('have.class', 'selected')
      .get('.pet-choice').first().find('img[alt="cat"]')
      .get('.pet-choice').first().contains('soul-meow')
      .get('.pet-choice').last().should('not.have.class', 'selected')
      .get('.pet-choice').last().find('img[alt="dog"]')
      .get('.pet-choice').last().contains('bark-mate')
  })

  it('should assert the titles of dog and cat questions', () => {
    cy.get('.pet-choice').last().contains('bark-mate').click()
      .clickButton('Next Question')
      .get('.question').contains('How loyal are you?')
      .get('.instructions').contains('slide the rating bar to change your answer')
      .clickButton('Next Question')
      .get('.question').contains('How clean are you?')
      .clickButton('Next Question')
      .get('.question').contains('What is your energy level?')
      .restartQuiz()
      .get('.pet-choice').first().contains('soul-meow').click()
      .clickButton('Next Question')  
      .get('.question').contains('How often do you like to be around other people?')
      .clickButton('Next Question') 
      .get('.question').contains('How clean are you?')
      .clickButton('Next Question')
      .get('.question').contains('How much do you like to cuddle?')
  })

  it.only('should take quiz for dog then go back and take quiz for cat', () => {
    const queries = ['protectiveness', 'shedding', 'energy', 'family_friendly', 'shedding', 'playfulness']
    queries.forEach((query, i) => {
      const animal = i <= 2 ? 'dog' : 'cat'
      stubSingleFetch(`${animal}s?${query}=${i > 2 ? i : i+1}`, `${animal}${i+1}`)
    })
    cy.takeQuiz('dog', [
      {rating:1, answer: 'I am loyal to no one.'}, 
      {rating:2, answer: 'I only clean up when I have guests.'},
      {rating:3, answer: 'I can be energetic, but I also like to relax.'}, 
    ])
    .get('.next-btn').contains('Submit Quiz!').click()
    .url().should('include', '/results')
    .wait(['@dog1', '@dog2', '@dog3']).then((interception) => {

      cy.get('.animal-image[alt="Australian Cattle Dog"]')
        .get('h1').contains('We found your bark-mate')
        .get('p.quicksand').contains('Scores on a scale of 1 - 5')
        .get('li').first().contains('Protectiveness: ')
        .get('li').first().children().should('have.length', 4)
        .get('li').next().contains('Energy: ').children().should('have.length', 5)
        .get('li').last().contains('Shedding: ').children().should('have.length', 3)
        .get('button').contains('Add to My Pets').find('img[alt="save button"]')
        .get('button').contains('Discard & Try Again').find('img[alt="discard button"]')
    })
    .get('[href="/quiz"]').click()
    .takeQuiz('cat', [
      {rating:3, answer: 'Sometimes. I\'m not a hermit, but I\'m no party animal either.'}, 
      {rating:4, answer: 'I keep things tidy, and if something gets messy I can clean it up.'},
      {rating:5, answer: 'I LOVE SNUGGLES!'}, 
    ])  
    .get('.next-btn').contains('Submit Quiz!').click()
    .url().should('include', '/results')
    .wait(['@cat4', '@cat5', '@cat6']).then((interception) => {

    })
  })

  it('should answer quiz questions with all possible answers for dog and cat', () => {
    cy.get('.pet-choice').first().contains('soul-meow').click()
      .clickButton('Next Question') 
      .testAllAnswers(catQuestions)
      .restartQuiz()
      .get('.pet-choice').last().contains('bark-mate').click()
      .clickButton('Next Question')
      .testAllAnswers(dogQuestions)
  })
})