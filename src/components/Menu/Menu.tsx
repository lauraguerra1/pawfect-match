import './Menu.css'
import { Link } from "react-router-dom"
import close from '../../images/close.png'


interface MenuProps  {
  openOrClose: (command: boolean) => void
}

const Menu = ({openOrClose}: MenuProps) => {
  return (
    <nav className='menu'>
      <button onClick={() => openOrClose(false)} className='close-menu'><img src={close} alt='close menu button'/></button>
      <Link to='/' className='link menu-link'>Home</Link>
      <Link to='/quiz' className='link menu-link'>Quiz</Link>
      <Link to='/saved-pets' className='link menu-link'>My Pets</Link>
    </nav>
  )
}

export default Menu