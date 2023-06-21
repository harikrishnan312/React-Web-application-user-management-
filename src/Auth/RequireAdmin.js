import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


function RequireAdmin() {
    const { admin } = useAuth();
    const location = useLocation();
    return (
        admin ? <Outlet/>
        :<Navigate to='/admin-login' state={{from :location }} replace/>

  );
}

export default RequireAdmin
