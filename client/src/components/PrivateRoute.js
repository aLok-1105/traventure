import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';


export default function PrivateRoute() {
    const {currentUser} = useSelector((state) =>state.user);
  return currentUser ? <Dashboard/> : <Navigate to='/signin'/>
}
