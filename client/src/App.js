import Home from '../src/components/Home'
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import {Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import ShowPosts from './pages/ShowPosts';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from './redux/user/userSlice';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || tokenIsInvalid(token)) {
      dispatch(signoutSuccess());
    }
  }, [dispatch]);

  const tokenIsInvalid = (token) => {
    return isTokenExpired(token);
  };

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (e) {
      return true;
    }
  };

  return (
    <>
      <Navbar/>
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
        <Route path='*' element={
          <>This is 404 page</>
        }>
          
        </Route>
      
      </Routes>
    </>
  );
}

export default App;
