import './Pet.css'
import bookmark from '../../images/bookmark.png'
import {Dog, Cat} from '../../types'
import { useState } from 'react'

interface PetProps {
  pet: Dog | Cat
  openModal: (pet: Cat | Dog) => void
}

const Pet = ({pet, openModal}: PetProps) => {


  return (
    <section className='pet'>
      <img src={pet.image_link} alt={pet.name} />
      <h2>{pet.name}</h2>
      <button onClick={() => openModal(pet)} className='bookmark-button'><img src={bookmark} alt='bookmark-btn'/></button>
    </section>
  )
}

export default Pet