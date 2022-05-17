import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import usersApi from '../../services/usersApi';
import getToken from '../../services/helpers/getToken';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setIsAuth] = useState(Boolean(getToken()));
  const location = useLocation();

  async function fetchAPI() {
    try {
      await usersApi.getAllUsers();
    } catch (err) {
      setIsAuth(false);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
