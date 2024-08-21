import './App.css';
import Navbar from './Components/NavBar/NavBar';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Courses from './Pages/Courses/Courses';
import Contact from './Pages/Contact/Contact';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import SignIn from './Pages/SignIn/SignIn';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      bg: '#1976d2',
      text: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      bg: '#000000',
      text: '#ffffff',
    },
  },
});

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme.palette.mode === 'light' ? darkTheme : lightTheme);
  };

  const directions = useSelector((state) => state.Localization.direction);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='APP' dir={directions} style={{ backgroundColor: theme.palette.background.default }}>
        <BrowserRouter>
          <Navbar toggleTheme={toggleTheme} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
