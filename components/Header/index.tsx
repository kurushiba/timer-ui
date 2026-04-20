import { Link } from 'react-router-dom';
import './index.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="" className="header-logo">
          ポモドーロタイマー
        </Link>

        <nav className="header-nav">
          {/* active クラスをつけたいリンクの className を "nav-link active" にしてください */}
          <Link to="" className="nav-link active">
            ホーム
          </Link>
          <Link to="" className="nav-link">
            タイマー
          </Link>
          <Link to="" className="nav-link">
            レポート
          </Link>
          <Link to="" className="nav-link">
            設定
          </Link>
        </nav>

        <div className="header-user">
          <span className="user-name">テストユーザー</span>
          <button className="logout-button" onClick={() => {}} type="button">
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
