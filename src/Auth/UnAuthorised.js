import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


function UnAuthorised() {
    const { user } = useAuth();
    const location = useLocation();
    return (
        user ? <Navigate to='/' state={{from :location }} replace/>
        :<Outlet/>
  );
}

export default UnAuthorised