
import React, { useEffect, useState, useCallback, useContext } from 'react';
import API from '../axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');

    try {
      const res = await API.get('/api/tasks');
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(
        'Error fetching tasks:',
        err.response?.data || err.message
      );

      setLoadError(
        err.response?.data?.message ||
          'Unable to load your tasks. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <main className="dashboard-container">
      <div className="dashboard-shell">
        {/* Navigation Header */}
        <header className="dashboard-header">
          <div className="dashboard-brand">
            <div className="dashboard-brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m8 9 1.5 1.5L12 8M14 9h2M8 15l1.5 1.5L12 14M14 15h2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="dashboard-brand-text">
              <span className="dashboard-brand-name">Task Manager</span>
              <span className="dashboard-brand-caption">
                PERSONAL WORKSPACE
              </span>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 17l5-5-5-5M15 12H3M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </button>
        </header>

        {/* Welcome Section */}
        <section className="dashboard-hero">
          <div className="dashboard-hero-content">
            <span className="dashboard-eyebrow">
              <span className="dashboard-eyebrow-dot" />
              YOUR PRODUCTIVITY SPACE
            </span>

            <h1>
              Plan better.
              <br />
              <span>Get more done.</span>
            </h1>

            <p>
              Organize your priorities, keep track of your tasks,
              and make every day count.
            </p>
          </div>

          <div className="dashboard-summary">
            <div className="summary-top">
              <span className="summary-label">YOUR TASKS</span>
              <span className="summary-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 5h12M8 12h12M8 19h12M3 5h.01M3 12h.01M3 19h.01"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <div className="summary-count">
              {isLoading ? '—' : tasks.length}
            </div>

            <p>
              {isLoading
                ? 'Loading your workspace...'
                : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} in your list`}
            </p>

            <div className="summary-progress-track">
              <span
                className="summary-progress-fill"
                style={{
                  width: isLoading
                    ? '25%'
                    : tasks.length === 0
                      ? '8%'
                      : `${Math.min(100, Math.max(12, tasks.length * 10))}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="dashboard-grid">
          <div className="dashboard-panel create-panel">
            <div className="panel-heading">
              <span className="panel-number">01 / CREATE</span>
              <h2>Add a new task</h2>
              <p>
                Write down what needs to get done. You can add a description too.
              </p>
            </div>

            <TaskForm fetchTasks={fetchTasks} />

            <div className="create-panel-tip">
              <span aria-hidden="true">✦</span>
              Small steps lead to big progress.
            </div>
          </div>

          <div className="dashboard-panel list-panel">
            <div className="task-list-heading">
              <div className="panel-heading">
                <span className="panel-number">02 / OVERVIEW</span>
                <h2>Your task list</h2>
                <p>Everything you have added, all in one place.</p>
              </div>

              <span className="task-count-badge">
                {isLoading ? '...' : tasks.length}
              </span>
            </div>

            {loadError ? (
              <div className="dashboard-error" role="alert">
                <span className="error-symbol">!</span>
                <h3>Couldn't load tasks</h3>
                <p>{loadError}</p>

                <button
                  type="button"
                  className="retry-btn"
                  onClick={fetchTasks}
                >
                  Try again
                </button>
              </div>
            ) : isLoading ? (
              <div className="dashboard-loading" role="status">
                <span className="loading-spinner" />
                <p>Loading your tasks...</p>
              </div>
            ) : (
              <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            )}
          </div>
        </section>

        <footer className="dashboard-footer">
          <span className="footer-decoration">✦</span>
          <p>Stay focused. Keep moving forward.</p>
          <span className="footer-caption">MADE FOR YOUR NEXT BIG THING</span>
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
