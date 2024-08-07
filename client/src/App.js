import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import ShowPosts from './pages/ShowPosts';
import { useState } from 'react';
import Footer from './components/Footer';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';


function App() {

  const [mode, setMode] = useState('light');
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  a:{
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
  // palette: {
  //     mode: 'dark',
  //   },
});
  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleColorMode={toggleColorMode}/>
      <Routes>
        <Route path='/' element={
          <Home />
          
        }>
        </Route>

        <Route path='/signup' element={
          <Signup/>
        }>
        </Route>

        <Route path='/signin' element={
          <Signin/>
        }>
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route path='/create-post' element={
          <CreatePost/>
        }>
        </Route>
        <Route path='/post' element={
          <ShowPosts/>
        }>
        </Route>
        <Route path='/about' element={
          <About/>
        }>
        </Route>
        <Route path='/contact' element={
          <Contact/>
        }>
        </Route>
        <Route path='*' element={
          <>This is 404 page</>
        }>
          
        </Route>
      
      </Routes>
      <Footer/>
      </ThemeProvider> 
    </>
  );
}

export default App;
