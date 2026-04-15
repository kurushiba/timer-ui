import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { authRepository } from '../../modules/auth/auth.repository';
import { currentUserAtom } from '../../modules/auth/current-user.state';
import { useAtom } from 'jotai';
import './index.css';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const signin = async () => {
    setIsLoading(true);
    try {
      const { user, token } = await authRepository.signin(email, password);
      localStorage.setItem('token', token);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) return <Navigate to='/' />;

  return (
    <div className="signin-page">
      <h1>ログイン</h1>

      <div>
        <label htmlFor='email'>メールアドレス</label>
        <input
          id='email'
          type='email'
          placeholder='example@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='password'>パスワード</label>
        <input
          id='password'
          type='password'
          placeholder='パスワードを入力'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type='button' onClick={signin} disabled={isLoading}>
        ログイン
      </button>

      <p>
        アカウントをお持ちでない方は
        <Link to='/signup'>新規登録</Link>
      </p>
    </div>
  );
}
