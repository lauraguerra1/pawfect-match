import './LandingPage.css'
import dogAndCat from '../../images/puppy-kitty-love.png'
import { Link } from 'react-router-dom'

const LandingPage = ({menuOpen}: {menuOpen: boolean}) => {
  return (
    <section className={menuOpen ? 'hidden' : 'landing-page'}>
      <h1>Take the quiz to find your pawfect match!</h1>
      <img className='dog-and-cat' src={dogAndCat} alt='grey kitty giving a kiss to a puppy golden retriver' />
      <Link to='/quiz' className='link landing-btn'>Start the quiz!</Link>    
    </section>
  )
}

export default LandingPage