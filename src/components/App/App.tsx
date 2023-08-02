import './App.css';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu'
import LandingPage from '../LandingPage/LandingPage';
import Quiz from '../Quiz/Quiz'
import Results from '../Results/Results'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QuizAnswers } from '../../types';
import { Question } from '../Quiz/QuizData';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [answersReady, setAnswersReady] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    pet: '', 
    query1: {answer: '', type: ''},
    query2: {answer: '', type: ''},
    query3: {answer: '', type: ''}
  })

  useEffect(() => {
    console.log(quizAnswers)

  }, [quizAnswers])

  const updateAnswers = (answer: string, queryNumber: number, question?: Question) => {
    if(queryNumber) {
      setQuizAnswers({...quizAnswers, [`query${queryNumber}`]: {answer: answer, type: question?.query}})
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
        <Route path='/quiz' element={<Quiz menuOpen={menuOpen} updateAnswers={updateAnswers} notifyReady={notifyReady}/>} />
        <Route path='/results' element={<Results answersReady={answersReady} quizAnswers={quizAnswers} menuOpen={menuOpen}/>} />
      </Routes>
    </main>
  );
}

export default App;
