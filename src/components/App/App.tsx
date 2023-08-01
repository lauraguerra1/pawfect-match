import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../NavBar/NavBar';
import './App.css';
import { useState } from 'react';

const App= () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const openOrClose = (command: boolean) =>{
    setMenuOpen(command)
  }

  return (
    <main>
      <NavBar menuOpen={menuOpen} openOrClose={openOrClose}/>
      {/* <Menu menuOpen={menuOpen} openOrClose={openOrClose}/> */}
      <Routes>
        <Route path='/' element={<LandingPage menuOpen={menuOpen}/>}/>
      </Routes>
    </main>
  );
}

export default App;
