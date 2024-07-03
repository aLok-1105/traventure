import Home from '../src/components/Home'
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import {Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import ShowPosts from './pages/ShowPosts';

function App() {
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
