type Answer = {
  answer: string,
  value: string
}

export type Question = {
  question: string,
  query: string;
  answers: Answer[]
}

const dogOrCat: Question = {
  question: 'Are you looking for your soul-meow or your bark-mate?',
  query: 'type',
  answers: [{answer: 'soul-meow', value: 'cat'}, {answer: 'bark-mate', value: 'dog'}]
}

const catQuestions: Question[] = [
  {  
    question: 'How often do you solve problems on your own? ',
    query: 'intelligence',
    answers: [
      {answer: 'Never, I appreciate all the help I can get!', value: '1'},
      {answer: 'Once in a while.', value: '2'},
      {answer: 'Sometimes, if I\'m feeling smart or confident.', value: '3'},
      {answer: 'Most of the time, but I\'m not afraid to ask for help when I need it.', value: '4'},
      {answer: 'Every day, all day!', value: '5'}
    ]
  },
  {  
    question: 'How clean are you?',
    query: 'shedding',
    answers: [
      {answer: 'Dude, anything goes in my house.', value: '1'},
      {answer: 'I only clean up when I have guests.', value: '2'},
      {answer: 'I don\'t mind cleaning up, but I\'m ok with letting things go if I\'m busy.', value: '3'},
      {answer: 'I keep things tidy, and if something gets messy I can clean it up.', value: '4'},
      {answer: 'I\'m a clean freak!', value: '5'}
    ]
  },
  {  
    question: 'How much do you like to cuddle?',
    query: 'playfulness',
    answers: [
      {answer: 'Ew, no. Get off me!', value: '1'},
      {answer: 'Rarely, and only  if I\'m in the mood for it. ', value: '2'},
      {answer: 'It depends on the moment! ', value: '3'},
      {answer: 'Pretty much most of the time, sign me up! ', value: '4'},
      {answer: 'I LOVE SNUGGLES!', value: '5'},
    ]
  },
]


const dogQuestions: Question[] = [
  {  
    question: 'How loyal are you? ',
    query: 'protectiveness',
    answers: [
      {answer: 'I am loyal to no one.', value: '1'},
      {answer: 'My loyalty can be swayed.', value: '2'},
      {answer: 'Somewhat loyal', value: '3'},
      {answer: 'Only loyal to some people.', value: '4'},
      {answer: 'I am loyal to a fault.', value: '5'}
    ]
  },
  {  
    question: 'What is your energy level? ',
    query: 'energy',
    answers: [
      {answer: 'I\’m a proud couch potato.', value: '1'},
      {answer: 'I prefer to chill out most of the time. ', value: '2'},
      {answer: 'I can be energetic, but I also like to relax.', value: '3'},
      {answer: 'I\'m  a go -getter, always looking for new things to do.', value: '4'},
      {answer: 'I\'m practically bouncing off the walls!', value: '5'},
    ]
  },
  {  
    question: 'How much do you like to cuddle? ',
    query: 'playfulness',
    answers: [
      {answer: 'Ew, no. Get off me!', value: '1'},
      {answer: 'Rarely, and only  if I\'m in the mood for it.', value: '2'},
      {answer: 'It depends on the moment! ', value: '3'},
      {answer: 'Pretty much most of the time, sign me up!', value: '4'},
      {answer: 'I LOVE SNUGGLES!', value: '5'}
    ]
  },
]

export {dogOrCat, catQuestions, dogQuestions}