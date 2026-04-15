import { FocusSession } from '../../modules/focus-sessions/focus-session.entity';

interface SessionLogProps {
  sessions: FocusSession[];
}

const TYPE_LABELS: Record<string, string> = {
  focus: '集中',
  short_break: '短休憩',
  long_break: '長休憩',
};

export default function SessionLog({ sessions }: SessionLogProps) {
  return (
    <div className="session-log-section">
      <h2 className="section-heading">今日のログ</h2>

      {sessions.length === 0 ? (
        <p className="empty-message">まだセッションがありません</p>
      ) : (
        <ul className="session-items">
          {sessions.map((session, index) => (
            <li
              key={session.id}
              className={`session-item ${session.interrupted ? 'interrupted' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className={`session-type-badge type-${session.type}`}>
                {TYPE_LABELS[session.type] || session.type}
              </span>
              <span className="session-task-name">
                {session.task?.title || '—'}
              </span>
              <span className="session-time">
                {new Date(session.startedAt).toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="session-duration">
                {Math.floor(session.duration / 60)}分
              </span>
              {session.interrupted && (
                <span className="interrupted-badge">中断</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
