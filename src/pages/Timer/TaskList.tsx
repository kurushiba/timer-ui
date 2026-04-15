import { useState } from 'react';
import { Task } from '../../modules/tasks/task.entity';
import TaskItem from '../../components/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onAdd: (title: string) => void;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  onAdd,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;
    setIsAdding(true);
    onAdd(title);
    setNewTitle('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAdding) handleAdd();
  };

  return (
    <div className="task-list-section">
      <h2 className="section-heading">タスク</h2>

      <div className="task-add-form">
        <input
          type="text"
          placeholder="新しいタスクを追加..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleAdd} disabled={isAdding}>
          追加
        </button>
      </div>

      <ul className="task-items">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            onToggleComplete={() => onToggleComplete(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}
