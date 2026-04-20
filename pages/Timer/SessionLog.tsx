export default function SessionLog() {
  return (
    <div className="session-log-section">
      <h2 className="section-heading">今日のログ</h2>

      {/* セッションが0件の場合のUIを確認する場合はこちらをコメントイン（下のulはコメントアウト）: */}
      {/* <p className="empty-message">まだセッションがありません</p> */}

      <ul className="session-items">
        <li className="session-item" style={{ animationDelay: '0s' }}>
          <span className="session-type-badge type-focus">集中</span>
          <span className="session-task-name">デザインのレビュー</span>
          <span className="session-time">14:00</span>
          <span className="session-duration">25分</span>
        </li>
        <li className="session-item" style={{ animationDelay: '0.05s' }}>
          <span className="session-type-badge type-short_break">短休憩</span>
          <span className="session-task-name">—</span>
          <span className="session-time">14:30</span>
          <span className="session-duration">5分</span>
        </li>
        {/* 中断ありのセッションのUIを確認する場合はこちらをコメントイン: */}
        {/* <li className="session-item interrupted" style={{ animationDelay: '0.1s' }}>
          <span className="session-type-badge type-focus">集中</span>
          <span className="session-task-name">バグ修正</span>
          <span className="session-time">15:00</span>
          <span className="session-duration">10分</span>
          <span className="interrupted-badge">中断</span>
        </li> */}
        <li className="session-item" style={{ animationDelay: '0.1s' }}>
          <span className="session-type-badge type-focus">集中</span>
          <span className="session-task-name">バグ修正</span>
          <span className="session-time">15:00</span>
          <span className="session-duration">25分</span>
        </li>
      </ul>
    </div>
  );
}
