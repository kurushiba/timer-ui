import TaskItem from '../../components/TaskItem';

export default function TaskList() {
  return (
    <div className="task-list-section">
      <h2 className="section-heading">タスク</h2>

      <div className="task-add-form">
        <input
          type="text"
          placeholder="新しいタスクを追加..."
        />
        <button type="button" onClick={() => {}}>
          追加
        </button>
      </div>

      <ul className="task-items">
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ul>
    </div>
  );
}
