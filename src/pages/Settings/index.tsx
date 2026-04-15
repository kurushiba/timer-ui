import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  settingsAtom,
  isRunningAtom,
  startedAtAtom,
  timerModeAtom,
  remainingSecondsAtom,
  totalSecondsAtom,
} from '../../modules/timer/timer.state';

import { userSettingRepository } from '../../modules/user-settings/user-setting.repository';
import { UserSetting } from '../../modules/user-settings/user-setting.entity';
import SettingForm from './SettingForm';
import './index.css';

export default function Settings() {
  const [settings, setSettings] = useAtom(settingsAtom);
  const isRunning = useAtomValue(isRunningAtom);
  const startedAt = useAtomValue(startedAtAtom);
  const mode = useAtomValue(timerModeAtom);
  const setRemaining = useSetAtom(remainingSecondsAtom);
  const setTotal = useSetAtom(totalSecondsAtom);

  const updateSettings = async (data: Partial<UserSetting>) => {
    try {
      const updated = await userSettingRepository.update(data);
      setSettings(updated);
      const secs = updated?.getDuration(mode) ?? 25 * 60;
      setRemaining(secs);
      setTotal(secs);
      window.alert('設定を保存しました');
    } catch (error) {
      console.error(error);
      window.alert('設定の保存に失敗しました');
    }
  };

  if (!settings) {
    return (
      <div className="settings-page">
        <div className="settings-loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">設定</h1>
        {(isRunning || startedAt !== null) && (
          <div className="settings-disabled-banner">
            タイマー動作中は設定を変更できません
          </div>
        )}
        <SettingForm
          initialValues={settings}
          onSubmit={updateSettings}
          disabled={isRunning || startedAt !== null}
        />
      </div>
    </div>
  );
}
