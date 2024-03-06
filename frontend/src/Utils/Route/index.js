import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../../screens/Login';
import RegistrationPage from '../../screens/Registration';
import NotFoundPage from '../../screens/ExceptionPages/NotFound';

const routes = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegistrationPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

const router = createBrowserRouter(routes);

export default router;
