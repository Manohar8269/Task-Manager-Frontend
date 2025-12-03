import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // ✅ Import your CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      console.log('✅ Login Response:', res.data);

      // Extract token
      const { token } = res.data;

      if (token) {
        // ✅ Save token and user info
        const userData = { email };
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        loginUser(userData);

        alert('🎉 Login Successful!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      console.error('❌ Login Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="login-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
