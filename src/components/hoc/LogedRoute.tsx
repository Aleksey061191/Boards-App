import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const LogedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.user.isAuthorized);
  console.log(auth);

  if (auth) {
    return <Navigate to="/main" state={{ from: location }} />;
  }
  return children;
};

export default LogedRoute;
