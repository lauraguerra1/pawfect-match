import { Cat, Dog } from "../../types"
import { useNavigate } from "react-router-dom"

interface DeleteWarningProps {
  closeModal: () => void
  deletePet: (pet: Cat | Dog) => void
  pet: Cat | Dog | null
  nav?: boolean
}

const DeleteWarning = ({ closeModal, deletePet, pet, nav }: DeleteWarningProps) => {
  const navigate = useNavigate();

  return (
    <dialog className='dialog' >
      <div className='dialog-flex'>
        <p>Are you sure you want to remove the {pet?.name} from your pets?</p>
        <div className='dialog-buttons'>
          <button onClick={() => {
            closeModal()
          }}>CANCEL</button>
          <button 
            onClick={() => {
              closeModal()
              if (pet) deletePet(pet)
              if(nav) navigate(-1)
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