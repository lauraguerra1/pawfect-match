import { Dog, Cat } from "../../types"
import { useParams } from "react-router-dom"

interface PetDetailsProps {
  checkIfSaved: (pet: Cat | Dog) => boolean
}

const PetDetails = ({checkIfSaved}: PetDetailsProps) => {
  const petName = useParams().name
  return (
    <section>

    </section>
  )
}

export default PetDetails