import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/pawfect_match-logo.png'
import menu from '../../images/menu.png'

interface NavBarProps  {
  openOrClose: (command: boolean) => void
}

const NavBar = ({openOrClose}: NavBarProps) => {
  return (
    <nav className='nav'>
      <Link className='logo' to='/'>
        <img  src={logo} alt='Pawfect match logo and home button'/>
      </Link>
      <button onClick={() => openOrClose(true)} className='menu-btn'><img src={menu} alt='menu button'/></button>
      <div className='nav-links'>
        <NavLink to='/' className='link nav-link'>Home</NavLink>
        <NavLink to='/quiz' className='link nav-link'>Quiz</NavLink>
        <NavLink to='/saved-pets' className='link nav-link'>My Pets</NavLink>
      </div>
    </nav>
  )
}

export default NavBar