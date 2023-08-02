import './Results.css'
import save from '../../images/save.png'
import discard from '../../images/discard.png'
import paw from '../../images/paw-print.png'
import noResults from '../../images/no-results.png'
import { Dog, Indexable } from '../../types'
import { getNames, getRandomAnimal } from '../../helpers'
import { useState, useEffect } from 'react'
import { GoldenRetriver, dogs, dogs2, dogs3 } from './MockData'
import { Link } from 'react-router-dom'

interface ResultsProps {
  menuOpen: boolean 
  answersReady: boolean
}

const Results = ({menuOpen, answersReady}:ResultsProps) => {
  const [petInfo, setPetInfo] = useState<Dog>(GoldenRetriver)
  const [displayResults, setDisplayResults] = useState(false)

  useEffect(() => {
    if(answersReady) {
      getPawfectMatch(dogs, dogs2, dogs3)
      setDisplayResults(true)
    }
  }, [answersReady])

  const pawRating = (rating: number | undefined) => {
    const pawEls = [];
    if(rating) {
      for(let i =0; i < rating; i++) {
        pawEls.push(<img className='paw-rating' src={paw} alt='paw print representing a rating point'/>)
      }
    }

    return pawEls
  }

  const getPawfectMatch = (query1: Dog[], query2: Dog [], query3: Dog[]) => {
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
    const petIdentity = allPets.find(dog => dog.name === randomPet)
    if(petIdentity) setPetInfo(petIdentity)
  }
  if(displayResults) {
    return (
      <section className={menuOpen ? 'hidden' : 'results-page'}>
        <img className='animal-image' src={petInfo?.image_link} alt={petInfo?.name}/>
        <article className='result-info'>
          <h1 className='result-title'>We found your bark-mate</h1>
          <section className='animal-details'>
              <h2>{petInfo?.name}</h2>
              <p className='quicksand'>Scores on a scale of 1 - 5</p>
              <ul>
                <li className='quicksand'>Protectiveness: {pawRating(petInfo?.protectiveness)}</li>
                <li className='quicksand'>Energy: {pawRating(petInfo?.energy)}</li>
                <li className='quicksand'>Playfulness: {pawRating(petInfo?.playfulness)}</li>
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
