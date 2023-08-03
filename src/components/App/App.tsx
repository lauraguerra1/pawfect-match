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
  const [savedPets, setSavedPets] = useState<(Dog | Cat)[]>([GoldenRetriver, Abyssinian, 
    {
    "length": "12 to 15 inches",
    "origin": "United States",
    "image_link": "https://api-ninjas.com/images/cats/american_shorthair.jpg",
    "family_friendly": 3,
    "shedding": 3,
    "general_health": 4,
    "playfulness": 2,
    "children_friendly": 4,
    "stranger_friendly": 4,
    "grooming": 4,
    "intelligence": 4,
    "other_pets_friendly": 3,
    "min_weight": 7.0,
    "max_weight": 12.0,
    "min_life_expectancy": 15.0,
    "max_life_expectancy": 20.0,
    "name": "American Shorthair"
  },  {
    "image_link": "https://api-ninjas.com/images/dogs/australian_cattle_dog.jpg",
    "good_with_children": 3,
    "good_with_other_dogs": 3,
    "shedding": 3,
    "grooming": 1,
    "drooling": 1,
    "coat_length": 1,
    "good_with_strangers": 3,
    "playfulness": 3,
    "protectiveness": 4,
    "trainability": 4,
    "energy": 5,
    "barking": 1,
    "min_life_expectancy": 12.0,
    "max_life_expectancy": 16.0,
    "max_height_male": 20.0,
    "max_height_female": 20.0,
    "max_weight_male": 50.0,
    "max_weight_female": 50.0,
    "min_height_male": 18.0,
    "min_height_female": 18.0,
    "min_weight_male": 35.0,
    "min_weight_female": 35.0,
    "name": "Australian Cattle Dog"
  },{
    "image_link": "https://api-ninjas.com/images/dogs/braque_francais_pyrenean.jpg",
    "good_with_children": 5,
    "good_with_other_dogs": 5,
    "shedding": 3,
    "grooming": 1,
    "drooling": 2,
    "coat_length": 1,
    "good_with_strangers": 3,
    "playfulness": 3,
    "protectiveness": 3,
    "trainability": 3,
    "energy": 5,
    "barking": 3,
    "min_life_expectancy": 12.0,
    "max_life_expectancy": 15.0,
    "max_height_male": 23.0,
    "max_height_female": 23.0,
    "max_weight_male": 55.0,
    "max_weight_female": 55.0,
    "min_height_male": 18.5,
    "min_height_female": 18.5,
    "min_weight_male": 40.0,
    "min_weight_female": 40.0,
    "name": "Braque Francais Pyrenean"
}])
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    pet: '', 
    query1: {answer: '', type: ''},
    query2: {answer: '', type: ''},
    query3: {answer: '', type: ''}
  })

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
  
  const addToSavedPets = (newPet: Dog | Cat) => {
    if(!savedPets.find(pet => pet.name === newPet.name)) {
      setSavedPets(prevPets => [...prevPets, newPet])
    }
  }

  const removeFromSavedPets = (oldPet: Dog | Cat) => {
    setSavedPets(prevPets => prevPets.filter(pet => pet.name !== oldPet.name))
  }

  return (
    <main>
      {error && <p>{error.message}</p>}
      {menuOpen? <Menu openOrClose={openOrClose}/> : <NavBar openOrClose={openOrClose}/>}
        <Routes>
          <Route path='/' element={<LandingPage menuOpen={menuOpen}/>}/>
          <Route path='/quiz' element={<Quiz menuOpen={menuOpen} updateAnswers={updateAnswers} notifyReady={notifyReady}/>} />
          <Route path='/results' element={answersReady ? <Results quizAnswers={quizAnswers} menuOpen={menuOpen} updateError={updateError} clearAnswers={clearAnswers}/> : <NoResults />} />
          <Route path='/saved-pets' element={<MyPets savedPets={savedPets} deletePet={removeFromSavedPets}/>}/>
        </Routes>
    </main>
  );
}

export default App;
