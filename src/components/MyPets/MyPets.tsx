import './MyPets.css'
import { Dog, Cat } from "../../types"
import Pet from '../Pet/Pet'
import { useState } from 'react'
import empty from '../../images/empty-saved.png'

interface MyPetsProps {
  savedPets: (Dog | Cat)[]
  deletePet: (oldPet: Dog | Cat) => void
  menuOpen: boolean
}
const MyPets = ({savedPets, deletePet, menuOpen}: MyPetsProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [petToDelete, setPetToDelete] = useState<Cat | Dog | null>(null)

  const openModal = (pet: Cat | Dog) => {
    document.querySelector('dialog')?.showModal()
    setModalOpen(true)
    setPetToDelete(pet)
  }

  const closeModal = () => {
    document.querySelector('dialog')?.close()
    setModalOpen(false)
    setPetToDelete(null)
  }

  const savedPetEls = savedPets.map(pet => {
    return (
      <Pet 
        pet={pet} 
        key={pet.name} 
        openModal={openModal}
      />
      )
  })

  return (
    <div className={menuOpen ? 'hidden' : ''}>
      <div >
        <section className={modalOpen ? 'blur pawfect-matches' : 'pawfect-matches'}>
          <h1>Your Pawfect Matches</h1>
          <section className='saved-pets'>
            {savedPets.length ? savedPetEls : 
              <div className='no-saved'>
                <h2>No pets saved yet! Take the quiz to find a match!</h2>
                <img src={empty} alt='cartoon cat sitting in a file box'/>
              </div>
            }
          </section>
        </section>
      </div>
      <dialog className='dialog' >
      <div className='dialog-flex'>
        <p>Are you sure you want to remove the {petToDelete?.name} from your pets?</p>
        <div className='dialog-buttons'>
          <button onClick={closeModal}>CANCEL</button>
          <button 
            onClick={() => {
              closeModal()
              if(petToDelete) deletePet(petToDelete)
            }}
          >
            REMOVE PET
          </button>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default MyPets