import './Results.css'
import save from '../../images/save.png'
import discard from '../../images/discard.png'
import paw from '../../images/paw-print.png'
import noResults from '../../images/no-results.png'
import { Dog, Cat, Indexable, QuizAnswers } from '../../types'
import { getNames, getRandomAnimal } from '../../helpers'
import { useState, useEffect } from 'react'
import { GoldenRetriver, Abyssinian, dogs, dogs2, dogs3, cats,  cats2, cats3 } from './MockData'
import { Link } from 'react-router-dom'

interface ResultsProps {
  menuOpen: boolean 
  answersReady: boolean
  quizAnswers: QuizAnswers
}

const Results = ({menuOpen, answersReady, quizAnswers}:ResultsProps) => {
  const {pet, query1, query2, query3} = quizAnswers
  const [catInfo, setCatInfo] = useState<Cat>(Abyssinian)
  const [dogInfo, setDogInfo] = useState<Dog>(GoldenRetriver)
  const [displayResults, setDisplayResults] = useState(false)

  useEffect(() => {
    if(answersReady) {
      pet === 'dog' 
      ? getPawfectMatch(dogs, dogs2, dogs3)
      : getPawfectMatch(cats, cats2, cats3)
      setDisplayResults(true)
    }
  }, [answersReady])

  const pawRating = (rating: number, type: string) => {
    const pawEls = [];
   
    for(let i =0; i < rating; i++) {
      pawEls.push(<img key={`${i}type${pet}`} className='paw-rating' src={paw} alt='paw print representing a rating point'/>)
    }
    

    return pawEls
  }

  const getPawfectMatch = (query1: Dog[] | Cat[], query2: Dog[] | Cat[], query3: Dog[] | Cat[]) => {
    const allPetNames = [query1, query2, query3].flatMap(petArray => getNames(petArray))
    const allPets = [query1, query2, query3].flat()

    const nameCount = allPetNames.reduce((names, curr) => {
    names[curr] ? names[curr] += 1 : names[curr] = 1
    return names
    }, {} as Indexable)
    
    const highestCount = Object.values(nameCount).reduce((highest, curr) => {
    if(curr > highest) {
      highest = curr
    }
    return highest 
    }, 0)
    
    const highCountAnimals = Object.keys(nameCount).filter(name => nameCount[name] === highestCount)
    
    const randomPet = getRandomAnimal(highCountAnimals)
    const petIdentity = allPets.find(pet => pet.name === randomPet)
    if(petIdentity && pet === 'cat') {
      setCatInfo(petIdentity as Cat)
    } 
    if(petIdentity && pet === 'dog') {
      setDogInfo(petIdentity as Dog)
    }
  }
  if(displayResults) {
    return (
      <section className={menuOpen ? 'hidden' : 'results-page'}>
        <img className='animal-image' src={pet === 'dog' ? dogInfo.image_link : catInfo.image_link} alt={pet === 'dog' ? dogInfo.name : catInfo.name}/>
        <article className='result-info'>
          <h1 className='result-title'>We found your {pet === 'dog' ? 'bark-mate' : 'soul-meow'}</h1>
          <section className='animal-details'>
              <h2>{pet === 'dog' ? dogInfo.name : catInfo.name}</h2>
              <p className='quicksand'>Scores on a scale of 1 - 5</p>
              <ul>
                {pet === 'dog' 
                  ? <>
                      <li className='quicksand'>Protectiveness: {pawRating(dogInfo.protectiveness, 'protect')}</li>
                      <li className='quicksand'>Energy: {pawRating(dogInfo.energy, 'energy')}</li>
                    </>
                  : <>
                      <li className='quicksand'>Friendliness: {pawRating(catInfo.family_friendly, 'energy')}</li>
                      <li className='quicksand'>Shedding: {pawRating(catInfo.shedding, 'shedd')}</li>
                    </>
                }
                <li className='quicksand'>Playfulness: {pawRating(pet === 'dog' ? dogInfo.playfulness : catInfo.playfulness ? catInfo.playfulness : 2, 'play')}</li>
              </ul>
          </section>
        </article>
        <section className='choice-buttons'>
          <button><img src={save} alt='save button'/>Add to My Pets</button>
          <button><img src={discard} alt='discard button'/>Discard & Try Again</button>
        </section>
      </section>
    )
  } else {
    return (
      <div className='no-results'>
        <img src={noResults} alt='kitten and puppy holding up a sign that says "Whoops! Please take the quiz to find your pawfect match!"'/>
        <Link to='/quiz' className='link landing-btn quiz-button'>Start the quiz!</Link>    
      </div>
    )
  }
}

export default Results
