import './Pet.css'
import bookmark from '../../images/bookmark.png'
import {Dog, Cat} from '../../types'
import { Link } from 'react-router-dom'

interface PetProps {
  pet: Dog | Cat
  openModal: (pet: Cat | Dog) => void
}

const Pet = ({pet, openModal}: PetProps) => {


  return (
    <section className='pet'>
      <Link className='pet-img-link' to={`/single-pet/${pet.name.replaceAll(' ',  '-')}`}> <img src={pet.image_link} alt={pet.name} /></Link>
      <Link className='title-link' to={`/single-pet/${pet.name.replaceAll(' ',  '-')}`}><h2>{pet.name}</h2></Link>
      <button onClick={() => openModal(pet)} className='bookmark-button'><img src={bookmark} alt='bookmark-btn'/></button>
    </section>
  )
}

export default Pet