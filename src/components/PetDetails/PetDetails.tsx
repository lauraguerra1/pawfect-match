import { Dog, Cat } from "../../types"
import { useParams } from "react-router-dom"
import EmptyState from "../EmptyState/EmptyState"
import { useEffect, useState } from "react"
import { isCat, isDog } from "../../helpers"

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
        <h1>{petSaved?.name}</h1>
        <img src={petSaved?.image_link} alt={petSaved?.name} />
        <article>
          <h2>Your Pet's Details</h2>
          <p>Minimum Life Expectancy: {petSaved?.min_life_expectancy}</p>
          <p>Maximum Life Expectancy: {petSaved?.max_life_expectancy}</p>
          <p>Shedding Amount: {petSaved?.shedding}</p>
          <p>Playfulness: {petSaved?.playfulness ? petSaved.playfulness : 'unknown'}</p>
          {isCat(petSaved) && 
            <>
              <p>General Health: {petSaved.general_health}</p>
              <p>Meowing: {petSaved.meowing ? petSaved.meowing : 'unknown'}</p>
            </>
          }
          {isDog(petSaved) && 
            <>
              <p>Energy: {petSaved.energy}</p>
              <p>Barking: {petSaved.barking}</p>
            </>
          }
        </article>
      </section>
    )

}

export default PetDetails