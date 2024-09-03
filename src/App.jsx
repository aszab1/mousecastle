import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <main className="p-6 h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
