import { Outlet } from 'react-router-dom';
import Header from '../Header';
import './index.css';

export default function AuthenticatedLayout() {
  return (
    <div className="authenticated-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
