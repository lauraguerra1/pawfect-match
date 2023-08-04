import { Link } from "react-router-dom"
import noQuizResults from '../../images/no-results.png'
import emptyPage from '../../images/page-not-found.png'

const EmptyState = ({menuOpen, noResults}: {menuOpen: boolean, noResults: boolean}) => {
  return (
    <div className={menuOpen ? 'hidden' : 'no-results'}>
      <img src={noResults ? noQuizResults : emptyPage} alt={`kitten and puppy holding up a sign that says ${noResults ? "Whoops! Please take the quiz to find your pawfect match!" : "Nothing to see here... Please go back!"}`}/>
      {noResults && <Link to='/quiz' className='link landing-btn quiz-button'>Start the quiz!</Link>}   
    </div>
  )
}

export default EmptyState