import { Link } from 'react-router-dom';
import './index.css';

export default function Signup() {
  return (
    <div className="signup-page">
      <h1>アカウント作成</h1>

      <div>
        <label htmlFor="username">ユーザー名</label>
        <input
          id="username"
          type="text"
          placeholder="山田太郎"
        />
      </div>

      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
        />
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          placeholder="8文字以上"
        />
      </div>

      <button type="button" onClick={() => {}}>
        アカウント作成
      </button>

      <p>
        既にアカウントをお持ちの方は
        <Link to="">ログイン</Link>
      </p>
    </div>
  );
}
