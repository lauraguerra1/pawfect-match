import { Cat, Dog } from "../../types"

interface DeleteWarningProps {
  closeModal: () => void
  deletePet: (pet: Cat | Dog) => void
  pet: Cat | Dog | null
}

const DeleteWarning = ({ closeModal, deletePet, pet }: DeleteWarningProps) => {
  return (
    <dialog className='dialog' >
      <div className='dialog-flex'>
        <p>Are you sure you want to remove the {pet?.name} from your pets?</p>
        <div className='dialog-buttons'>
          <button onClick={closeModal}>CANCEL</button>
          <button 
            onClick={() => {
              closeModal()
              if (pet) deletePet(pet)
            }}
          >
            REMOVE PET
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteWarning