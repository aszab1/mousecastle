import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Hero } from './components/pages/Hero.jsx';
import { Instructions } from './components/pages/Instructions.jsx';

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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
