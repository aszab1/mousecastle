import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Hero } from './components/pages/Hero.jsx';
import { Instructions } from './components/pages/Instructions.jsx';
import Password from './components/pages/Password.jsx';
import Submission from './components/pages/Submission.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // Landing page where a language is selected
        path: '/',
        element: <Hero />,
      },
      {
        path: '/instructions',
        element: <Instructions />,
      },
      {
        path: '/password',
        element: <Password />,
      },
      {
        path: '/submission',
        element: <Submission />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
