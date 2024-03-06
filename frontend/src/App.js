import { ThemeProvider } from '@emotion/react';
import './App.css';
import { Theme } from './Theme';
import LoginPage from './screens/Login';
import RegistrationPage from './screens/Registration';
import NotFoundPage from './screens/ExceptionPages/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
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

])

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
