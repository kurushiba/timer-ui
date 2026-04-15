export default function TimerDisplay() {
  // SVG円の計算値: radius=120, circumference=2*π*120≈753.98
  // strokeDashoffset は進捗に応じて変化（0=完了, 753.98=未開始）
  // 現在の値 376.99 は50%進行した状態

  return (
    <div className="timer-display">
      {/* モードラベル: 確認したいモードのコメントを外し、他をコメントアウトしてください */}
      <div className="timer-mode-label mode-focus">
        集中
      </div>
      {/* <div className="timer-mode-label mode-short_break">短休憩</div> */}
      {/* <div className="timer-mode-label mode-long_break">長休憩</div> */}

      <div className="timer-circle-wrapper">
        <svg className="timer-svg" viewBox="0 0 280 280">
          <circle
            className="timer-track"
            cx="140"
            cy="140"
            r={120}
            fill="none"
            strokeWidth="6"
          />
          {/* timer-progress のクラスも mode-* に合わせて変更してください */}
          <circle
            className="timer-progress mode-focus"
            cx="140"
            cy="140"
            r={120}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={753.98}
            strokeDashoffset={376.99}
            transform="rotate(-90 140 140)"
          />
        </svg>
        <div className="timer-time">
          25:00
        </div>
      </div>

      <div className="session-dots">
        {/* 4セッションのドット（sessionsBeforeLongBreak=4）、completedクラスで達成済みを示す */}
        <span className="session-dot completed" />
        <span className="session-dot completed" />
        <span className="session-dot" />
        <span className="session-dot" />
      </div>

      <div className="timer-controls">
        {/* 開始ボタン（タイマー停止中）: */}
        <button className="control-button start-button" onClick={() => {}} type="button">
          開始
        </button>
        {/* 一時停止ボタン（タイマー実行中）のUIを確認する場合は上をコメントアウトしてこちらをコメントイン: */}
        {/* <button className="control-button pause-button" onClick={() => {}} type="button">
          一時停止
        </button> */}
        <button className="control-button reset-button" onClick={() => {}} type="button">
          リセット
        </button>
      </div>
    </div>
  );
}
