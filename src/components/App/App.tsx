import './App.css';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu'
import LandingPage from '../LandingPage/LandingPage';
import Quiz from '../Quiz/Quiz'
import Results from '../Results/Results'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

type QuizAnswers = {
  pet: string, 
  query1: string,
  query2: string,
  query3: string
}

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [answersReady, setAnswersReady] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    pet: '', 
    query1: '',
    query2: '',
    query3: ''
  })

  useEffect(() => {
    console.log(quizAnswers)

  }, [quizAnswers])

  const updateAnswers = (answer: string, queryNumber: number) => {
    if(queryNumber) {
      setQuizAnswers({...quizAnswers, [`query${queryNumber}`]: answer})
    } else {
      setQuizAnswers({...quizAnswers, pet: answer})
    }
  }

  const notifyReady = () => setAnswersReady(true)

  const openOrClose = (command: boolean) =>{
    setMenuOpen(command)
  }

  return (
    <main>
      {menuOpen? <Menu openOrClose={openOrClose}/> : <NavBar openOrClose={openOrClose}/>}
      <Routes>
        <Route path='/' element={<LandingPage menuOpen={menuOpen}/>}/>
        <Route path='/quiz' element={<Quiz updateAnswers={updateAnswers} notifyReady={notifyReady}/>} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </main>
  );
}

export default App;
