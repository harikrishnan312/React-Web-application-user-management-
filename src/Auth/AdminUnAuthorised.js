import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


function AdminUnAuthorised() {
    const { admin } = useAuth();
    const location = useLocation();
    return (
        admin ? <Navigate to='/admin-home' state={{from :location }} replace/>
        :<Outlet/>
  );
}

export default AdminUnAuthorised