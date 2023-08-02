import {dogQuestions, catQuestions} from '../../src/components/Quiz/QuizData'

describe('template spec', () => {
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
      .get('.question').contains('What is your energy level?')
      .clickButton('Next Question')
      .get('.question').contains('How much do you like to cuddle?')
      .restartQuiz()
      .get('.pet-choice').first().contains('soul-meow').click()
      .clickButton('Next Question')  
      .get('.question').contains('How often do you solve problems on your own?')
      .clickButton('Next Question') 
      .get('.question').contains('How clean are you?')
      .clickButton('Next Question')
      .get('.question').contains('How much do you like to cuddle?')
  })

  it('should answer quiz questions for dog then go back and answer for cat', () => {
    cy.takeQuiz('dog', [
      {rating:1, answer: 'I am loyal to no one.'}, 
      {rating:2, answer: 'I prefer to chill out most of the time.'},
      {rating:3, answer: 'It depends on the moment!'}, 
    ])
      .restartQuiz()
      .takeQuiz('cat', [
      {rating:3, answer: 'Sometimes, if I\'m feeling smart or confident.'}, 
      {rating:4, answer: 'I keep things tidy, and if something gets messy I can clean it up.'},
      {rating:5, answer: 'I LOVE SNUGGLES!'}, 
    ])  
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