import './MyPets.css'
import { Dog, Cat } from "../../types"
import Pet from '../Pet/Pet'
import { useState } from 'react'

interface MyPetsProps {
  savedPets: (Dog | Cat)[]
  deletePet: (oldPet: Dog | Cat) => void
}
const MyPets = ({savedPets, deletePet}: MyPetsProps) => {
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
    <>
      <div style={{maxHeight: '90vh', overflow: 'auto'}}>
        <section className={modalOpen ? 'blur pawfect-matches' : 'pawfect-matches'}>
          <h1>Your Pawfect Matches</h1>
          <section className='saved-pets'>
            {savedPetEls}
          </section>
        </section>
      </div>
      <dialog className='dialog' >
      <div className='dialog-flex'>
        <p>Are you sure you want to remove the {petToDelete?.name} from your pets?</p>
        <div>
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
    </>
  )
}

export default MyPets