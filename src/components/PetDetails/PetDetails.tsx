import { Dog, Cat } from "../../types"
import { useParams } from "react-router-dom"
import EmptyState from "../EmptyState/EmptyState"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { isCat, isDog } from "../../helpers"
import PawRating from "../PawRating/PawRating"
import back from '../../images/back.png'
import bookmark from '../../images/bookmark.png'
import './PetDetails.css'
import DeleteWarning from "../DeleteWarning/DeleteWarning"
import { getChatGPTFunFact } from "../../apiCalls"
import loadingAnimation from '../../images/loading.gif'

interface PetDetailsProps {
  deletePet: (pet: Cat | Dog) => void
  updateError: (error: Error | null) => void
  menuOpen: boolean
  error: Error | null
}

const PetDetails = ({error, menuOpen, deletePet, updateError }: PetDetailsProps) => {
  const petName = useParams().name?.replaceAll('-', ' ')
  const [petSaved, setPetSaved] = useState<Cat | Dog | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [funFact, setFunFact] = useState('')
  const [loading, setLoading] = useState(false)

  const callAPI = async (pet: Cat | Dog) => {
    setLoading(true)
    try {
      const funFact = await getChatGPTFunFact(pet.name)
      setFunFact(funFact.choices[0].text)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if(error instanceof Error) updateError(error)
    }
  }

  const openModal = () => {
    document.querySelector('dialog')?.showModal()
    setModalOpen(true)
  }

  const closeModal = () => {
    document.querySelector('dialog')?.close()
    setModalOpen(false)
  }

  useEffect(() => {
    const storage = localStorage.getItem('pawfectMatches')
    if (storage) {
      const pet = JSON.parse(storage).find((animal: Cat | Dog) => animal.name === petName)
      setPetSaved(pet)
      callAPI(pet)
    }

    return () => updateError(null)
  }, [])

  if (!petSaved) {
    return <EmptyState menuOpen={menuOpen} noResults={false} />
  }

  if (loading) {
    return (
      <div className='loading-container'>
        <img className='loading' src={loadingAnimation} alt='loading animation with a blue paw' />
        <h1>Getting details for the {petName}...</h1>
      </div>
    )
  }
  if (error === null) {

    return (
      <div className={modalOpen ? 'blur' : '' }>
    <div className='top-buttons'>
      <Link to='/saved-pets'><img className='back-btn' src={back} alt='back button' /></Link>
      <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={openModal}><img src={bookmark} alt='bookmark button' /></button>
    </div>
      <section className={menuOpen ? 'hidden' : 'details-page-container' }>
      <section className='pet-details-page'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h1 style={{textAlign: 'center'}}>{petSaved.name}</h1>
          <img className='pet-image' src={petSaved.image_link} alt={petSaved.name} />
        </div>
        <div className='pet-details-article'>
          <article>
            <h2>Your Pet's Details</h2>
            <p className='quicksand'>Scores on a scale of 1 - 5</p>
            <ul>
              <li className='quicksand'>Minimum Life Expectancy: {petSaved.min_life_expectancy} years</li>
              <li className='quicksand'>Maximum Life Expectancy: {petSaved.max_life_expectancy} years</li>
              <li className='quicksand'>Shedding: <PawRating rating={petSaved.shedding} type='shedding' pet={petSaved.name} /></li>
              <li className='quicksand'>Playfulness: <PawRating rating={petSaved.playfulness ? petSaved.playfulness : 2} type='playfulness' pet={petSaved.name} /></li>
              {isCat(petSaved) && 
                <>
                  <li className='quicksand'>General Health: <PawRating rating={petSaved.general_health} type='general_health' pet={petSaved.name} /></li>
                  <li className='quicksand'>Meowing: <PawRating rating={petSaved.meowing ? petSaved.meowing : 2} type='meowing' pet={petSaved.name} /></li>
                </>
              }
              {isDog(petSaved) && 
                <>
                  <li className='quicksand'>Energy: <PawRating rating={petSaved.energy} type='energy' pet={petSaved.name} /></li>
                  <li className='quicksand'>Barking: <PawRating rating={petSaved.barking} type='barking' pet={petSaved.name} /></li>
                </>
              }
              </ul>
          </article>
          </div>
        </section>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
          <article style={{textAlign: 'center', maxWidth: '70%'}}>
            <h2>Fun Fact</h2>
            <p>{funFact}</p>
          </article>

        </div>
      </section>
      <DeleteWarning closeModal={closeModal} deletePet={deletePet} pet={petSaved} nav={true} />
    </div>
  )
}

}

export default PetDetails