import { Dog, Cat } from "../../types"
import { useParams } from "react-router-dom"
import EmptyState from "../EmptyState/EmptyState"
import { useEffect, useState } from "react"
import { isCat, isDog } from "../../helpers"
import PawRating from "../PawRating/PawRating"
import './PetDetails.css'

interface PetDetailsProps {
  deletePet: (pet: Cat | Dog) => void
  addPet: (pet: Cat | Dog) => void
  menuOpen: boolean
}

const PetDetails = ({menuOpen, deletePet, addPet }: PetDetailsProps) => {
  const petName = useParams().name?.replaceAll('-', ' ')
  const [petSaved, setPetSaved] = useState<Cat | Dog | null>(null)

  useEffect(() => {
    const storage = localStorage.getItem('pawfectMatches')
    if (storage) setPetSaved(JSON.parse(storage).find((animal: Cat | Dog) => animal.name === petName)) 
  }, [])

  if (!petSaved) {
    return <EmptyState menuOpen={menuOpen} noResults={false} />
  }

  return (
    <section className={menuOpen ? 'hidden' : 'pet-details-page'}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{textAlign: 'center'}}>{petSaved.name}</h1>
        <img className='pet-image' src={petSaved.image_link} alt={petSaved.name} />
      </div>
      <div className='pet-details-article'>
        <article>
          <h2>Your Pet's Details</h2>
          <p className='quicksand'>Scores on a scale of 1 - 5</p>
          <ul>
            <li className='quicksand'>Minimum Life Expectancy: {petSaved.min_life_expectancy} YEARS</li>
            <li className='quicksand'>Maximum Life Expectancy: {petSaved.max_life_expectancy} YEARS</li>
            <li className='quicksand'>Shedding Amount: <PawRating rating={petSaved.shedding} type='shedding' pet={petSaved.name} /></li>
            <li className='quicksand'>Playfulness: <PawRating rating={petSaved.playfulness ? petSaved.playfulness : 2} type='playfulness' pet={petSaved.name} /></li>
            {isCat(petSaved) && 
              <>
                <li className='quicksand'>General Health: <PawRating rating={petSaved.general_health} type='general_health' pet={petSaved.name} /></li>
                <li className='quicksand'>Meowing: <PawRating rating={petSaved.meowing ? petSaved.meowing : 2} type='meowing' pet={petSaved.name} /></li>
              </>
            }
            {isDog(petSaved) && 
              <>
                <li className='quicksand'>Energy: <PawRating rating={petSaved.energy} type='energy' pet={petSaved.name} /></li>
                <li className='quicksand'>Barking: <PawRating rating={petSaved.barking} type='barking' pet={petSaved.name} /></li>
              </>
            }
          </ul>
        </article>
      </div>
    </section>
  )

}

export default PetDetails