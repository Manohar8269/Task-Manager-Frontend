import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav
      style={{
        background: '#1976d2',
        color: '#fff',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      {/* Left side logo / title */}
      <h2 style={{ margin: 0 }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
          TaskManager
        </Link>
      </h2>

      {/* Right side links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {!user ? (
          <>
            <Link to="/" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <>
            <span>👋 {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// Common link style
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '6px 10px',
  borderRadius: '5px',
  transition: 'background 0.3s',
};

export default Navbar;
