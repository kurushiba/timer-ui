import TimerDisplay from './TimerDisplay';
import TaskList from './TaskList';
import SessionLog from './SessionLog';
import './index.css';

export default function Timer() {
  // ローディング状態のUIを確認する場合はこちらをコメントイン:
  // return (
  //   <div className="timer-page">
  //     <div className="timer-loading">
  //       <div className="spinner" />
  //     </div>
  //   </div>
  // );

  return (
    <div className="timer-page">
      <div className="timer-layout">
        <div className="timer-main">
          <TimerDisplay />

          <div className="auto-start-toggle">
            <label>自動開始</label>
            {/* OFF状態のUIを確認する場合は "toggle-button" から "active" クラスを外してください */}
            <button
              className="toggle-button active"
              onClick={() => {}}
              type="button"
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="timer-sidebar">
          <div className="task-selector">
            <label htmlFor="taskSelect">集中するタスク</label>
            <select id="taskSelect" defaultValue="">
              <option value="">なし</option>
              <option value="1">デザインのレビュー</option>
              <option value="2">バグ修正</option>
              <option value="3">ドキュメント作成</option>
            </select>
          </div>

          <TaskList />
          <SessionLog />
        </div>
      </div>
    </div>
  );
}
