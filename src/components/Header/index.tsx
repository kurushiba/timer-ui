import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import './index.css';

export default function Header() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(undefined);
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          ポモドーロタイマー
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            ホーム
          </Link>
          <Link
            to="/timer"
            className={`nav-link ${location.pathname === '/timer' ? 'active' : ''}`}
          >
            タイマー
          </Link>
          <Link
            to="/report"
            className={`nav-link ${location.pathname === '/report' ? 'active' : ''}`}
          >
            レポート
          </Link>
          <Link
            to="/settings"
            className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            設定
          </Link>
        </nav>

        <div className="header-user">
          <span className="user-name">{currentUser?.name}</span>
          <button className="logout-button" onClick={logout} type="button">
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
