import './App.css'
import Navbar from './Components/NavBar/NavBar'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Courses from './Pages/Courses/Courses'
import Contact from './Pages/Contact/Contact'

function App() {

  return (
    <div className='APP'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
