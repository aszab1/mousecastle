import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Hero } from './components/pages/Hero.jsx';
import { Instructions } from './components/pages/Instructions.jsx';
import Password from './components/pages/Password.jsx';
import Submission from './components/pages/Submission.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AllQuestions } from './components/pages/AllQuestions.jsx';


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
        path:'/questions',
        element: <AllQuestions />
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
    <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>
);
