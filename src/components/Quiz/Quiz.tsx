import './Quiz.css'
import { useState, useEffect } from 'react'
import { Question, dogQuestions, catQuestions, dogOrCat } from './QuizData'
import kitty from '../../images/kitty.png'
import puppy from '../../images/puppy.png'
import back from '../../images/back.png'
import { Indexable } from '../../types'
import { Link } from 'react-router-dom'

const images: Indexable & {cat: string, dog: string} = {
  'cat': kitty,
  'dog': puppy
}

const allQuestions: Indexable & {cat: Question[], dog: Question[]}= {
  'cat': catQuestions,
  'dog': dogQuestions
}

interface QuizProps {
  menuOpen: boolean
  updateAnswers: (answer: string, queryNumber: number, question?: Question) => void
  notifyReady: () => void
}

const Quiz = ({menuOpen, updateAnswers, notifyReady}: QuizProps) => {
  const [selectedPet, setSelectedPet] = useState('cat')
  const [question, setQuestion] = useState<Question>(dogOrCat)
  const [sliderBar, setSliderBar] = useState<{visible: boolean, rating: string}>({visible: false, rating: ''})
  const [ratingAnswer, setRatingAnswer] = useState('')
  const [questionNumber, setQuestionNumber] = useState(0)


  useEffect(() => {
    const ratingAnswer = question.answers.find(answer => answer.value === sliderBar.rating)
    if(ratingAnswer) setRatingAnswer(ratingAnswer.answer)
  }, [sliderBar])

  const updateSlider = (value:string) => {
    setSliderBar({visible: true, rating: value})
  }

  useEffect(() => {
    if(JSON.stringify(question) == JSON.stringify(dogOrCat)) {
      setSliderBar({visible: false, rating: ''})
    } else {
      setSliderBar({visible: true, rating: '3'})
    }
  }, [question])

  useEffect(() => {
    if(questionNumber) {
      setQuestion(allQuestions[selectedPet][questionNumber -1])
    } else {
      setQuestion(dogOrCat)
    }
  }, [questionNumber])
  

  const goToNextQuestion = () => {
    if(questionNumber) {
      updateAnswers(sliderBar.rating, questionNumber, question)
    } else {
      updateAnswers(selectedPet, questionNumber)
    }
    setQuestionNumber(prev => prev +1)
  }

  const goToPrevQuestion = () => setQuestionNumber(prev => prev -1)

  const submitQuiz = () => {
    updateAnswers(sliderBar.rating, questionNumber, question)
    notifyReady()
  }
  
  const animalEls = question.answers.map(answer => {
    return (
    <section key={answer.value} className={selectedPet === answer.value ? 'selected pet-choice' : 'pet-choice'} onClick={() => setSelectedPet(answer.value)} onDoubleClick={goToNextQuestion}>
      <img src={images[answer.value]} alt={`${answer.value}`}/>
      <p>{answer.answer}</p>
    </section>
    )
  })

  return (
    <section className={menuOpen ? 'hidden' : 'quiz'}>
      {questionNumber > 0 && <button onClick={goToPrevQuestion} className='back-btn'><img src={back} alt='back button' /></button>}
      <header className='quiz-header'>
        <h1 className='question header-child'>{question.question}</h1>
        {sliderBar.visible && <p className='instructions header-child'>slide the rating bar to change your answer</p>}
      </header>
      {sliderBar.visible && 
      <>
        <div className='slider-bar-container'>
          <input type='range' value={sliderBar.rating} onChange={(e) => setSliderBar({visible: true, rating: e.target.value})} min='1' max='5'/>
          <div className='range-markers'>
            <span className='marker' id='marker1' onClick={() => updateSlider('1')}><p>1</p></span>
            <span className='marker' id='marker2' onClick={() => updateSlider('2')}><p>2</p></span>
            <span className='marker' id='marker3' onClick={() => updateSlider('3')}><p>3</p></span>          
            <span className='marker' id='marker4' onClick={() => updateSlider('4')}><p>4</p></span> 
            <span className='marker' id='marker5' onClick={() => updateSlider('5')}><p>5</p></span>       
          </div>
        </div>
        <article className='rating-answer'>
          <p data-cy='answer'>{ratingAnswer}</p>
        </article>
      </>}
      {!sliderBar.visible && 
        <div className='animal-els'>
          {animalEls}
        </div>
      }
      {questionNumber < 3 && <button onClick={goToNextQuestion} className='next-btn'>Next Question</button>}
      {questionNumber === 3 && <Link className='next-btn results-link' to='/results' onClick={submitQuiz}>Submit Quiz!</Link>}
    </section>
  )
}

export default Quiz