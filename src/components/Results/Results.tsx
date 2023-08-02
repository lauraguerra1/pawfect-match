import './Results.css'
import save from '../../images/save.png'
import discard from '../../images/discard.png'
import paw from '../../images/paw-print.png'
import { Dog, Indexable } from '../../types'
import { getNames, getRandomAnimal } from '../../helpers'
import { useState } from 'react'
import { GoldenRetriver, dogs, dogs2, dogs3 } from './MockData'

const Results = ({menuOpen}: {menuOpen: boolean}) => {
  const [petInfo, setPetInfo] = useState<Dog>(GoldenRetriver)
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
}

export default Results
