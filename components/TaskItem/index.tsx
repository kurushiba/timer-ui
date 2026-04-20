import './index.css';

export default function TaskItem() {
  return (
    // 完了済みタスクのUIを確認する場合は className を "task-item completed" に変更してください
    <li className="task-item">
      <span className="task-dot" />
      {/* チェックボックスあり（タイマーページ）のUIを確認する場合はこちらをコメントイン: */}
      {/* <input type="checkbox" checked={false} onChange={() => {}} /> */}
      <span className="task-title">タスクのタイトル</span>
      {/* 削除ボタンあり（タイマーページ）のUIを確認する場合はこちらをコメントイン: */}
      {/* <button className="task-delete-button" type="button" onClick={() => {}}>✕</button> */}
    </li>
  );
}
