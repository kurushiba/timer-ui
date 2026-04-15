import { Link } from 'react-router-dom';
import './index.css';

export default function Signin() {
  return (
    <div className="signin-page">
      <h1>ログイン</h1>

      <div>
        <label htmlFor='email'>メールアドレス</label>
        <input
          id='email'
          type='email'
          placeholder='example@example.com'
        />
      </div>

      <div>
        <label htmlFor='password'>パスワード</label>
        <input
          id='password'
          type='password'
          placeholder='パスワードを入力'
        />
      </div>

      <button type='button' onClick={() => {}}>
        ログイン
      </button>

      <p>
        アカウントをお持ちでない方は
        <Link to=''>新規登録</Link>
      </p>
    </div>
  );
}
