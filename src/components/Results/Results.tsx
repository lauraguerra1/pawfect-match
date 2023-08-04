import './Results.css'
import save from '../../images/save.png'
import discard from '../../images/discard.png'
import paw from '../../images/paw-print.png'
import { Dog, Cat, Indexable, QuizAnswers } from '../../types'
import { getNames, getRandomAnimal, isCat, isDog } from '../../helpers'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GoldenRetriver, Abyssinian } from './BackupResults'
import loadingAnimation from '../../images/loading.gif'
import { getAnimalInfo } from '../../apiCalls'

interface ResultsProps {
  menuOpen: boolean 
  quizAnswers: QuizAnswers
  updateError: (error: Error | null) => void
  clearAnswers: () => void
  savePet: (pet: Dog | Cat) => void
  savedPets: (Dog | Cat)[]
}

type QueryResponse =  Indexable & {
  query1: Dog[] | Cat[],
  query2: Dog[] | Cat[],
  query3: Dog[] | Cat[]
}

const Results = ({menuOpen, quizAnswers, updateError, clearAnswers, savePet, savedPets}:ResultsProps) => {
  const {pet} = quizAnswers
  const [catInfo, setCatInfo] = useState<Cat>(Abyssinian)
  const [dogInfo, setDogInfo] = useState<Dog>(GoldenRetriver)
  const [queryResponse, setQueryResponse] = useState<QueryResponse>({query1: [], query2: [], query3: []})
  const [loading, setLoading] = useState(false)
  const [petAlreadySaved, setPetAlreadySaved] = useState(false)

  useEffect(() => {
    if(pet === 'cat') {
      setPetAlreadySaved(checkIfSaved(catInfo))
    } 

    if(pet === 'dog') {
      setPetAlreadySaved(checkIfSaved(dogInfo))
    }

  }, [catInfo, dogInfo])

  useEffect(() => {
    const apiCall = async (quizAnswers: QuizAnswers) => {
      setLoading(true)
      try {
        Object.keys(quizAnswers).forEach(async key => {
          const query = quizAnswers[key]
          if (query !== 'cat' && query !== 'dog') {
            const animalInfo = await getAnimalInfo(`${pet}s?${query.type}=${query.answer}`)
            setQueryResponse(prev => {
              const newRes = {...prev, [key]: animalInfo}
              return newRes
            })
          }
        })
      } catch(error) {
        setLoading(false)
        if(error instanceof Error) updateError(error)
      }
    }

    // apiCall(quizAnswers)
    return () => {
      updateError(null)
      clearAnswers()
    }
  }, [])

  useEffect(() => {
    if(queryResponse.query1.length && queryResponse.query2.length && queryResponse.query3.length) {
      setLoading(false)
      getPawfectMatch(queryResponse.query1, queryResponse.query2, queryResponse.query3)
    }
  }, [queryResponse])

  const pawRating = (rating: number, type: string) => {
    const pawEls = [];
   
    for(let i =0; i < rating; i++) {
      pawEls.push(<img key={`${i}${type}${pet}`} className='paw-rating' src={paw} alt='paw print representing a rating point'/>)
    }
    
    return pawEls
  }

  const getPawfectMatch = (query1: Dog[] | Cat[], query2: Dog[] | Cat[], query3: Dog[] | Cat[]) => {
    const allPetNames = [query1, query2, query3].flatMap(petArray => getNames(petArray))
    const allPets = [query1, query2, query3].flat()

    const nameCount = allPetNames.reduce((names: Record<string, number>, curr) => {
      names[curr] ? names[curr] += 1 : names[curr] = 1
      return names
    }, {})
    
    const highestCount = Object.values(nameCount).reduce((highest, curr) => {
      if(curr > highest) {
        highest = curr
      }
      return highest 
    }, 0)
    
    const highCountAnimals = Object.keys(nameCount).filter(name => nameCount[name] === highestCount)
    
    const randomPet = getRandomAnimal(highCountAnimals)
    const petIdentity = allPets.find(pet => pet.name === randomPet)

    if(petIdentity && isCat(petIdentity)) {
      setCatInfo(petIdentity)
    } 

    if(petIdentity && isDog(petIdentity)) {
      setDogInfo(petIdentity)
    }
  }

  const checkIfSaved = (animal: Cat | Dog) => savedPets.find(pet => pet.name === animal.name) ? true : false 

  if(loading) {
    return (
    <div className='loading-container'>
      <img className='loading' src={loadingAnimation} alt='loading animation with a blue paw'/>
      <h1>Loading...</h1>
    </div>
    )
  } else {
    return (
      <>
        <section className={menuOpen ? 'hidden' : 'results-page'}>
        {petAlreadySaved && 
        <div className='already-saved-container'>
          <header>
            <h1 className='heading-piece'>WOW! This match is truly pawfect!</h1>
            <p className='heading-piece'>The {pet === 'dog' ? dogInfo.name : catInfo.name } is already in your pets and you've been matched again!</p>
          </header>
          <div className='top-link-container'>
            <Link className='link' to='/saved-pets'>View My Pets</Link>
            <Link className='link' to='/saved-pets'>Return To Quiz</Link>
          </div>
        </div>
        }
          <img className='animal-image' src={pet === 'dog' ? dogInfo.image_link : catInfo.image_link} alt={pet === 'dog' ? dogInfo.name : catInfo.name}/>
          <article className='result-info'>
            {!petAlreadySaved && <h1 className='result-title'>We found your {pet === 'dog' ? 'bark-mate' : 'soul-meow'}</h1>}
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
                        <li className='quicksand'>Playfulness: {pawRating(catInfo.playfulness ? catInfo.playfulness : 2, 'shedd')}</li>
                      </>
                  }
                  <li className='quicksand'>Shedding: {pawRating(pet === 'dog' ? dogInfo.shedding : catInfo.shedding, 'shedd')}</li>
                </ul>
            </section>
          </article>
          {!petAlreadySaved && 
            <section className='choice-buttons'>
              <Link className='link' to='/saved-pets' onClick={() => savePet(pet === 'dog' ? dogInfo : catInfo)}><img src={save} alt='save button'/>Add to My Pets</Link>
              <Link className='link' to='/quiz'><img src={discard} alt='discard button'/>Discard & Try Again</Link>
            </section>
          }
        </section>
      </>
    )        
  }
}

export default Results
