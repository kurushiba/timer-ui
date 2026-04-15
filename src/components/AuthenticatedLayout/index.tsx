import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import Header from '../Header';
import './index.css';
import { useGlobalTimer } from '../../modules/timer/useGlobalTimer';
import { userSettingRepository } from '../../modules/user-settings/user-setting.repository';
import {
  remainingSecondsAtom,
  settingsAtom,
  totalSecondsAtom,
} from '../../modules/timer/timer.state';
import { useEffect } from 'react';

export default function AuthenticatedLayout() {
  const currentUser = useAtomValue(currentUserAtom);
  const setRemaining = useSetAtom(remainingSecondsAtom);
  const setTotal = useSetAtom(totalSecondsAtom);
  const setSettings = useSetAtom(settingsAtom);

  useGlobalTimer();

  useEffect(() => {
    fetchSettings();

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const fetchSettings = async () => {
    const settings = await userSettingRepository.findAll();
    setSettings(settings);
    const secs = settings.focusDuration * 60;
    setRemaining(secs);
    setTotal(secs);
  };

  if (!currentUser) return <Navigate to="/signin" />;

  return (
    <div className="authenticated-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
