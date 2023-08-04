import lazy from '../../images/tired-pets.png'
import './ErrorPage.css'
const ErrorPage =({error, menuOpen}: {error: Error, menuOpen: boolean}) => {
  return(
    <div className={menuOpen ? 'hidden' : 'error-page'}>
      <img src={lazy} alt="cat and dog rolling around on the floor"/>
      <h1>Whoops! {error.message}</h1>
    </div>
  )
}

export default ErrorPage