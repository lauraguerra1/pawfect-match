import { Dog, Cat } from "../../types"
import { useParams } from "react-router-dom"
import EmptyState from "../EmptyState/EmptyState"
import { useEffect, useState } from "react"
import { isCat, isDog } from "../../helpers"
import PawRating from "../PawRating/PawRating"

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
    <section className={menuOpen ? 'hidden' : ''}>
      <h1>{petSaved.name}</h1>
      <img src={petSaved.image_link} alt={petSaved.name} />
      <article>
        <h2>Your Pet's Details</h2>
        <p>Minimum Life Expectancy: {petSaved.min_life_expectancy} YEARS</p>
        <p>Maximum Life Expectancy: {petSaved.max_life_expectancy} YEARS</p>
        <p>Shedding Amount: <PawRating rating={petSaved.shedding} type='shedding' pet={petSaved.name} /></p>
        <p>Playfulness: <PawRating rating={petSaved.playfulness ? petSaved.playfulness : 2} type='playfulness' pet={petSaved.name} /></p>
        {isCat(petSaved) && 
          <>
            <p>General Health: <PawRating rating={petSaved.general_health} type='general_health' pet={petSaved.name} /></p>
            <p>Meowing: <PawRating rating={petSaved.meowing ? petSaved.meowing : 2} type='meowing' pet={petSaved.name} /></p>
          </>
        }
        {isDog(petSaved) && 
          <>
            <p>Energy: <PawRating rating={petSaved.energy} type='energy' pet={petSaved.name} /></p>
            <p>Barking: <PawRating rating={petSaved.barking} type='barking' pet={petSaved.name} /></p>
          </>
        }
      </article>
    </section>
  )

}

export default PetDetails