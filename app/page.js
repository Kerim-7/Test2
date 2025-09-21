import dynamic from 'next/dynamic';
import Notifications from './components/Notifications/Notifications';
import Sidebar from './components/Sidebar/Sidebar';
import './globals.css';

const ThemeToggle = dynamic(() => import('./components/ThemeToggle/ThemeToggle'), {
  ssr: false,
  loading: () => null
});

export default function Home() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Notifications />
      </main>
      <ThemeToggle />
    </div>
  );
}
