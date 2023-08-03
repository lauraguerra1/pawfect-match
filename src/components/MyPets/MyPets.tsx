import './MyPets.css'
import { Dog, Cat } from "../../types"
import Pet from '../Pet/Pet'
interface MyPetsProps {
  savedPets: (Dog | Cat)[]
  deletePet: (oldPet: Dog | Cat) => void
}
const MyPets = ({savedPets, deletePet}: MyPetsProps) => {
  const savedPetEls = savedPets.map(pet => {
    return <Pet pet={pet} key={pet.name} />
  })

  return (
    <section className='pawfect-matches'>
      <h1>Your Pawfect Matches</h1>
      <section className='saved-pets'>
        {savedPetEls}
      </section>
    </section>
  )
}

export default MyPets