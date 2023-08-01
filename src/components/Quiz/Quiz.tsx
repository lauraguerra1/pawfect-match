import './Quiz.css'
import { useState } from 'react'

const Quiz = () => {
  const [question, setQuestion] = useState('What\'s your energy level?')
  const [sliderBar, setSliderBar] = useState<{visible: boolean, rating: string}>({visible: true, rating: '3'})

  const updateSlider = (value:string) => {
    setSliderBar({visible: true, rating: value})
  }

  return (
    <section className='quiz'>
      <header className='quiz-header'>
        <h1 className='question header-child'>{question}</h1>
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
    </section>
  )
}

export default Quiz