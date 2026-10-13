import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/api/auth/login', {
        email,
        password,
      });

      const { token } = res.data;

      if (!token) {
        setError('Login failed. No authentication token received.');
        return;
      }

      const userData = { email };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Keep the existing authentication context integration.
      loginUser(userData);

      navigate('/dashboard');
    } catch (err) {
      console.error(
        'Login Error:',
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-orb">
        <div className="login-card">
          <div className="login-heading">
            <h1>Login</h1>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-input-group">
              <span className="login-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.2 0-7.5 2.2-7.5 5v2h15v-2c0-2.8-3.3-5-7.5-5Z" />
                </svg>
              </span>

              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-input-group">
              <span className="login-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM10 7a2 2 0 0 1 4 0v2h-4V7Zm2 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.2-2.4 3.3M6.2 6.2C3.9 7.6 2.5 10 2 12c1 2.5 4.5 7 10 7 1 0 2-.2 2.9-.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="remember-switch">
                  <span />
                </span>
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  setError(
                    'Password reset is not configured yet. Please contact support.'
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
              {!loading && (
                <span className="submit-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </button>
          </form>

          <p className="login-footer">
            Don't have an account?{' '}
            <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;