import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Theme } from './Theme';
import Route from './Utils/Route';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={Route} />
      </ThemeProvider>
    </>
  );
}

export default App;
