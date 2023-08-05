import { Dog, Cat } from "../../types"
import { useParams } from "react-router-dom"
import EmptyState from "../EmptyState/EmptyState"
import { useEffect, useState } from "react"
import { isCat, isDog } from "../../helpers"

interface PetDetailsProps {
  checkIfSaved: (name: string) => boolean
  deletePet: (pet: Cat | Dog) => void
  addPet: (pet: Cat | Dog) => void
  menuOpen: boolean
  savedPets: (Cat | Dog)[]
}

const PetDetails = ({menuOpen, checkIfSaved, deletePet, addPet, savedPets}: PetDetailsProps) => {
  const petName = useParams().name?.replaceAll('-', ' ')
  const [petSaved, setPetSaved] = useState(false)
  const [pet, setPet] = useState<Cat | Dog | null>(null)

  useEffect(() => {
    if(petName) setPetSaved(checkIfSaved(petName))
  }, [])

  useEffect(() => {
    if(petSaved) {
      console.log(petName)
      const savedPet = savedPets.find(animal => animal.name === petName)
      setPet(savedPet ? savedPet : null)
      console.log(pet)
    }
  }, [petSaved])

  if(!petSaved) {
    return <EmptyState menuOpen={menuOpen} noResults={false}/>
  }

  // console.log(pet)

  return (
    <section className={menuOpen ? 'hidden' : ''}>
      <h1>{pet?.name}</h1>
      <img src={pet?.image_link} alt={pet?.name}/>
      <article>
        <h2>Your Pet's Details</h2>
        <p>Minimum Life Expectancy: {pet?.min_life_expectancy}</p>
        <p>Maximum Life Expectancy: {pet?.max_life_expectancy}</p>
        <p>Shedding Amount: {pet?.shedding}</p>
        <p>Playfullness: {pet?.playfulness ? pet.playfulness : 'unknown'}</p>
        {/* {isCat(pet) && 
          <>
            <p>General Health: {pet.general_health}</p>
            <p>Meowing: {pet.meowing ? pet.meowing : 'unknown'}</p>
          </>
        }
        {isDog(pet) && 
          <>
            <p>Energy: {pet.energy}</p>
            <p>Barking: {pet.barking}</p>
          </>
        } */}
      </article>
    </section>
  )
}

export default PetDetails