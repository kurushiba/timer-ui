import './index.css';

interface TaskItemProps {
  title: string;
  completed?: boolean;
  onToggleComplete?: () => void;
  onDelete?: () => void;
}

export default function TaskItem({
  title,
  completed = false,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      {onToggleComplete ? (
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggleComplete}
        />
      ) : (
        <span className="task-dot" />
      )}
      <span className="task-title">{title}</span>
      {onDelete && (
        <button
          className="task-delete-button"
          type="button"
          onClick={onDelete}
        >
          ✕
        </button>
      )}
    </li>
  );
}
