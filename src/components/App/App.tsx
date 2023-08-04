import './App.css';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu'
import LandingPage from '../LandingPage/LandingPage';
import Quiz from '../Quiz/Quiz'
import Results from '../Results/Results'
import NoResults from '../NoResults/NoResults';
import MyPets from '../MyPets/MyPets'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QuizAnswers } from '../../types';
import { Question } from '../Quiz/QuizData';
import {Dog, Cat} from '../../types'
import { Abyssinian, GoldenRetriver } from '../Results/BackupResults';

const App = () => {
  const [error, setError] = useState<Error | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [answersReady, setAnswersReady] = useState(false)
  const [savedPets, setSavedPets] = useState<(Dog | Cat)[]>([])
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    pet: '', 
    query1: {answer: '', type: ''},
    query2: {answer: '', type: ''},
    query3: {answer: '', type: ''}
  })

  useEffect(() => {
    const storage = localStorage.getItem('pawfectMatches')
    if (storage) setSavedPets(JSON.parse(storage))
  }, [])

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

  const updateError = (error: Error | null) => setError(error)

  const clearAnswers = () => {
    setAnswersReady(false)
    setQuizAnswers({
      pet: '', 
      query1: {answer: '', type: ''},
      query2: {answer: '', type: ''},
      query3: {answer: '', type: ''}
    })
  }

  const updateSavedPets = (pets: (Dog | Cat)[]) => {
    localStorage.setItem('pawfectMatches', JSON.stringify(pets))
    setSavedPets(JSON.parse(localStorage.pawfectMatches))
  }
  
  const addToSavedPets = (newPet: Dog | Cat) => {
    updateSavedPets([...savedPets, newPet])
  }

  const removeFromSavedPets = (oldPet: Dog | Cat) => {
    const filteredPets = savedPets.filter(pet => pet.name !== oldPet.name)
    updateSavedPets(filteredPets)
  }

  return (
    <main>
      {error && <p>{error.message}</p>}
      {menuOpen? <Menu openOrClose={openOrClose}/> : <NavBar openOrClose={openOrClose}/>}
        <Routes>
          <Route path='/' element={<LandingPage menuOpen={menuOpen}/>}/>
          <Route path='/quiz' element={<Quiz menuOpen={menuOpen} updateAnswers={updateAnswers} notifyReady={notifyReady}/>} />
          <Route path='/results' element={answersReady ? <Results quizAnswers={quizAnswers} menuOpen={menuOpen} updateError={updateError} clearAnswers={clearAnswers} savePet={addToSavedPets}/> : <NoResults />} />
          <Route path='/saved-pets' element={<MyPets savedPets={savedPets} deletePet={removeFromSavedPets}/>}/>
        </Routes>
    </main>
  );
}

export default App;
