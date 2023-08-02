import './Results.css'
import { dogInfo } from './MockData'
import save from '../../images/save.png'
import discard from '../../images/discard.png'
import paw from '../../images/paw-print.png'

const Results = ({menuOpen}: {menuOpen: boolean}) => {
  const pawRating = (rating: number | undefined) => {
    const pawEls = [];
    if(rating) {
      for(let i =0; i < rating; i++) {
        pawEls.push(<img className='paw-rating' src={paw} alt='animal paw print representing a rating point'/>)
      }
    }

    return pawEls
  }

  return (
    <section className={menuOpen ? 'hidden' : 'results-page'}>
      <img className='animal-image' src={dogInfo?.image_link} alt={dogInfo?.name}/>
      <article className='result-info'>
        <h1 className='result-title'>We found your bark-mate</h1>
        <section className='animal-details'>
            <h2>{dogInfo?.name}</h2>
            <p className='quicksand'>Scores on a scale of 1 - 5</p>
            <ul>
              <li className='quicksand'>Protectiveness: {pawRating(dogInfo?.protectiveness)}</li>
              <li className='quicksand'>Energy: {pawRating(dogInfo?.energy)}</li>
              <li className='quicksand'>Playfulness: {pawRating(dogInfo?.playfulness)}</li>
            </ul>
        </section>
      </article>
      <section className='choice-buttons'>
        <button><img src={save} alt='save button'/>Add to My Pets</button>
        <button><img src={discard} alt='discard button'/>Discard & Try Again</button>
      </section>
    </section>
  )
}

export default Results
