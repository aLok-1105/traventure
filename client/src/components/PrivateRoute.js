import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import { Navigate } from 'react-router-dom';


export default function PrivateRoute() {
    const {currentUser} = useSelector((state) =>state.user);
  return currentUser ? <Dashboard/> : <Navigate to='/signin'/>
}
