import './Pet.css'
import bookmark from '../../images/bookmark.png'
import {Dog, Cat} from '../../types'

const Pet = ({pet}: {pet: Dog | Cat}) => {
  return (
    <section className='pet'>
      <img src={pet.image_link} alt={pet.name} />
      <h2>{pet.name}</h2>
      <button className='bookmark-button'><img src={bookmark} alt='bookmark-btn'/></button>
    </section>
  )
}

export default Pet