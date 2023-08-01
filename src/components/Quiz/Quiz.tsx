import './Quiz.css'
import { useState, useEffect } from 'react'
import { Question, dogQuestions } from './QuizData'

const Quiz = () => {
  const [question, setQuestion] = useState<Question>(dogQuestions[1])
  const [sliderBar, setSliderBar] = useState<{visible: boolean, rating: string}>({visible: true, rating: '3'})
  const [ratingAnswer, setRatingAnswer] = useState('')

  useEffect(() => {
    const ratingAnswer = question.answers.find(answer => answer.value === sliderBar.rating)
    if(ratingAnswer) setRatingAnswer(ratingAnswer.answer)
  }, [sliderBar])
  const updateSlider = (value:string) => {
    setSliderBar({visible: true, rating: value})
  }

  return (
    <section className='quiz'>
      <header className='quiz-header'>
        <h1 className='question header-child'>{question.question}</h1>
        {sliderBar.visible && <p className='instructions header-child'>slide the rating bar to change your answer</p>}
      </header>
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
        <p>{ratingAnswer}</p>
      </article>
      <button className='next-btn'>Next Question</button>
    </section>
  )
}

export default Quiz