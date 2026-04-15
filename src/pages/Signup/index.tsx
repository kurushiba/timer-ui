import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { authRepository } from '../../modules/auth/auth.repository';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { useAtom } from 'jotai';
import './index.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const signup = async () => {
    if (!name || !email || !password) {
      return;
    }

    if (password.length < 8) {
      return;
    }

    setIsLoading(true);
    try {
      const { user, token } = await authRepository.signup(
        name,
        email,
        password
      );
      localStorage.setItem('token', token);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <div className="signup-page">
      <h1>アカウント作成</h1>

      <div>
        <label htmlFor="username">ユーザー名</label>
        <input
          id="username"
          type="text"
          placeholder="山田太郎"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          placeholder="8文字以上"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="button" onClick={signup} disabled={isLoading}>
        アカウント作成
      </button>

      <p>
        既にアカウントをお持ちの方は
        <Link to="/login">ログイン</Link>
      </p>
    </div>
  );
}
