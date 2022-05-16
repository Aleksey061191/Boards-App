import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const auth = localStorage.getItem('token');

  if (!auth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
