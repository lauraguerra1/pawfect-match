import { Link } from "react-router-dom"
import noResults from '../../images/no-results.png'

const NoResults = ({menuOpen}: {menuOpen: boolean}) => {
  return (
    <div className={menuOpen ? 'hidden' : 'no-results'}>
      <img src={noResults} alt='kitten and puppy holding up a sign that says "Whoops! Please take the quiz to find your pawfect match!"'/>
      <Link to='/quiz' className='link landing-btn quiz-button'>Start the quiz!</Link>    
    </div>
  )
}

export default NoResults