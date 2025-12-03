import React from 'react';
import API from '../axios';
import './TaskList.css'; // ✅ optional custom styling

function TaskList({ tasks, fetchTasks }) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('❌ Error deleting task:', err);
      alert('Failed to delete task.');
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-task">No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div className="task-info">
              <h3>{task.text || task.title}</h3>
              {task.description && <p>{task.description}</p>}
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
