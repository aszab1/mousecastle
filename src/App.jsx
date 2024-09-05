import { Outlet, useLocation } from 'react-router';
import { SelectedLanguage } from './components/pages/SelectedLanguage';

function App() {
  const path = useLocation().pathname;

  return (
    <>
      <main className="p-6 h-screen">
        {path != '/' && <SelectedLanguage />}
        <Outlet />
      </main>
    </>
  );
}

export default App;
