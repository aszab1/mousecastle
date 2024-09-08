import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { SelectedLanguage } from './components/pages/SelectedLanguage';

function App() {
  const location = useLocation()
  const path = useLocation().pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    
    <div className="min-h-screen">
      <main className="container mx-auto px-6 sm:px-6 md:px-20 lg:px-30 py-6 md:py-8 lg:py-10 min-h-screen">
        {path != '/' && <SelectedLanguage />}
        <Outlet />
      </main>
      </div>
    
  );
}

export default App;
