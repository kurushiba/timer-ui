export default function SettingForm() {
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
            defaultValue={25}
          />
        </div>

        <div className="setting-item">
          <label htmlFor="shortBreakDuration">短休憩時間（分）</label>
          <input
            id="shortBreakDuration"
            type="number"
            min={1}
            max={30}
            defaultValue={5}
          />
        </div>

        <div className="setting-item">
          <label htmlFor="longBreakDuration">長休憩時間（分）</label>
          <input
            id="longBreakDuration"
            type="number"
            min={1}
            max={60}
            defaultValue={15}
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
            defaultValue={4}
          />
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">動作設定</h2>

        <div className="setting-item toggle-item">
          <label htmlFor="autoStartNext">休憩後の自動開始</label>
          {/* OFF状態のUIを確認する場合は "toggle-button active" から "active" を外してください */}
          <button
            id="autoStartNext"
            className="toggle-button active"
            onClick={() => {}}
            type="button"
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <button className="save-button" onClick={() => {}}>
        設定を保存
      </button>
    </>
  );
}
