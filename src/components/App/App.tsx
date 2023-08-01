import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../NavBar/NavBar';
import Menu from '../Menu/Menu'
import Quiz from '../Quiz/Quiz'
import './App.css';
import { useState } from 'react';

const App= () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const openOrClose = (command: boolean) =>{
    setMenuOpen(command)
  }

  return (
    <main>
      {menuOpen? <Menu openOrClose={openOrClose}/> : <NavBar openOrClose={openOrClose}/>}
      <Routes>
        <Route path='/' element={<LandingPage menuOpen={menuOpen}/>}/>
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </main>
  );
}

export default App;
