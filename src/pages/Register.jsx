import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/api/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (res && res.data) {
        alert('✅ Registration Successful! Please login now.');
        navigate('/');
      } else {
        setError('Unexpected response from server.');
      }
} catch (err) {
  const status = err.response?.status;
  const data = err.response?.data;

  console.error('Register API Status:', status);
  console.error(
    'Register API Error:',
    JSON.stringify(data, null, 2)
  );

  setError(
    data?.error ||
    data?.message ||
    err.message ||
    'Registration failed. Please try again.'
  );
} finally {
  setLoading(false);
}
  };

  return (
    <main className="register-page">
      <div className="register-orb">
        <div className="register-card">
          <div className="register-heading">
            <h1>Create Account</h1>
            <p>Sign up to get started</p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            {/* Full Name */}
            <div className="register-input-group">
              <span className="register-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.2 0-7.5 2.2-7.5 5v2h15v-2c0-2.8-3.3-5-7.5-5Z" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Full Name"
                aria-label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            {/* Email Address */}
            <div className="register-input-group">
              <span className="register-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>

            {/* Password */}
            <div className="register-input-group">
              <span className="register-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM10 7a2 2 0 0 1 4 0v2h-4V7Zm2 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create Password"
                aria-label="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="register-password-toggle"
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

            {error && (
              <p className="register-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              <span>{loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}</span>

              {!loading && (
                <span className="register-submit-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </button>
          </form>

          <p className="register-footer">
            Already have an account?{' '}
            <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;