import { Link } from "react-router-dom"
import noQuizResults from '../../images/no-results.png'
import emptyPage from '../../images/page-not-found.png'

interface EmptyStateProps {
  menuOpen: boolean 
  noResults: boolean
}

const EmptyState = ({menuOpen, noResults}: EmptyStateProps) => {
  return (
    <div className={menuOpen ? 'hidden' : 'no-results'}>
      <img src={noResults ? noQuizResults : emptyPage} alt={`kitten and puppy holding up a sign that says ${noResults ? 'Whoops! Please take the quiz first to find your pawfect match!' : 'Nothing to see here... Please go back!'}`}/>
      {noResults ? <Link to='/quiz' className='link landing-btn quiz-button'>Start the quiz!</Link> : <Link to='/' className='link landing-btn quiz-button'>Take me Home!</Link>}   
    </div>
  )
}

export default EmptyState