import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <main className="app-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
