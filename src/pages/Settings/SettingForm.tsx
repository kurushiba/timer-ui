import { useState } from 'react';
import { UserSetting } from '../../modules/user-settings/user-setting.entity';

interface SettingFormProps {
  initialValues: UserSetting;
  onSubmit: (data: Partial<UserSetting>) => Promise<void>;
  disabled?: boolean;
}

export default function SettingForm({
  initialValues,
  onSubmit,
  disabled,
}: SettingFormProps) {
  const [focusDuration, setFocusDuration] = useState(
    initialValues.focusDuration,
  );
  const [shortBreakDuration, setShortBreakDuration] = useState(
    initialValues.shortBreakDuration,
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    initialValues.longBreakDuration,
  );
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(
    initialValues.sessionsBeforeLongBreak,
  );
  const [autoStartNext, setAutoStartNext] = useState(
    initialValues.autoStartNext,
  );
  const [soundEnabled, setSoundEnabled] = useState(initialValues.soundEnabled);
  const [soundType, setSoundType] = useState(initialValues.soundType);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSubmit({
        focusDuration,
        shortBreakDuration,
        longBreakDuration,
        sessionsBeforeLongBreak,
        autoStartNext,
        soundEnabled,
        soundType,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="settings-section">
        <h2 className="section-title">タイマー設定</h2>

        <div className="setting-item">
          <label htmlFor="focusDuration">集中時間（分）</label>
          <input
            id="focusDuration"
            type="number"
            min={1}
            max={60}
            value={focusDuration}
            onChange={(e) => setFocusDuration(Number(e.target.value))}
            disabled={disabled}
          />
        </div>

        <div className="setting-item">
          <label htmlFor="shortBreakDuration">短休憩時間（分）</label>
          <input
            id="shortBreakDuration"
            type="number"
            min={1}
            max={30}
            value={shortBreakDuration}
            onChange={(e) => setShortBreakDuration(Number(e.target.value))}
            disabled={disabled}
          />
        </div>

        <div className="setting-item">
          <label htmlFor="longBreakDuration">長休憩時間（分）</label>
          <input
            id="longBreakDuration"
            type="number"
            min={1}
            max={60}
            value={longBreakDuration}
            onChange={(e) => setLongBreakDuration(Number(e.target.value))}
            disabled={disabled}
          />
        </div>

        <div className="setting-item">
          <label htmlFor="sessionsBeforeLongBreak">
            長休憩までのセッション数
          </label>
          <input
            id="sessionsBeforeLongBreak"
            type="number"
            min={1}
            max={10}
            value={sessionsBeforeLongBreak}
            onChange={(e) => setSessionsBeforeLongBreak(Number(e.target.value))}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">動作設定</h2>

        <div className="setting-item toggle-item">
          <label htmlFor="autoStartNext">休憩後の自動開始</label>
          <button
            id="autoStartNext"
            className={`toggle-button ${autoStartNext ? 'active' : ''}`}
            onClick={() => setAutoStartNext(!autoStartNext)}
            type="button"
            disabled={disabled}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">通知設定</h2>

        <div className="setting-item toggle-item">
          <label htmlFor="soundEnabled">通知音</label>
          <button
            id="soundEnabled"
            className={`toggle-button ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            type="button"
            disabled={disabled}
          >
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="setting-item">
          <label htmlFor="soundType">通知音の種類</label>
          <select
            id="soundType"
            value={soundType}
            onChange={(e) => setSoundType(e.target.value)}
            disabled={disabled}
          >
            <option value="default">デフォルト</option>
            <option value="bell">ベル</option>
            <option value="chime">チャイム</option>
          </select>
        </div>
      </div>

      <button className="save-button" onClick={handleSave} disabled={isSaving || disabled}>
        {isSaving ? '保存中...' : '設定を保存'}
      </button>
    </>
  );
}
