import { Link } from 'react-router-dom';
import TaskItem from '../../components/TaskItem';
import './index.css';

export default function Home() {
  // ローディング状態のUIを確認する場合はこちらをコメントイン:
  // return (
  //   <div className="home-page">
  //     <div className="home-loading">
  //       <div className="spinner" />
  //     </div>
  //   </div>
  // );

  return (
    <div className="home-page">
      <section className="home-welcome">
        <h1 className="welcome-heading">おかえりなさい、テストユーザーさん</h1>
        <p className="welcome-date">2026年4月15日(水)</p>
      </section>

      <section className="home-stats">
        <div className="stat-card">
          <span className="stat-label">今日の集中時間</span>
          <span className="stat-value">1h 30m</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">完了セッション</span>
          <span className="stat-value">
            3<span className="stat-unit">回</span>
          </span>
        </div>
      </section>

      <section className="home-quick-action">
        <Link to="" className="start-timer-button">
          タイマーを開始
        </Link>
      </section>

      <section className="home-tasks">
        <div className="tasks-header">
          <h2 className="tasks-heading">未完了タスク</h2>
          {/* タスクが5件より多い場合の「すべて表示」リンク（コメントインで確認）: */}
          {/* <Link to="" className="tasks-show-all">すべて表示</Link> */}
        </div>
        {/* タスクが0件の場合のUIを確認する場合はコメントイン（下のulはコメントアウト）: */}
        {/* <p className="tasks-empty">タスクはありません</p> */}
        <ul className="tasks-list">
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ul>
      </section>
    </div>
  );
}
