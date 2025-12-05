import React, { useState } from 'react';
import API from '../axios';

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('⚠️ Please enter a task title.');
      return;
    }

    try {
      setLoading(true);
      const res = await API.post('/api/tasks', { title, description });
      console.log('✅ Task added:', res.data);

      // Reset form fields
      setTitle('');
      setDescription('');

      // Refresh task list
      fetchTasks();
    } catch (err) {
      console.error('❌ Error adding task:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="task-form">
      <input
        type="text"
        placeholder="📝 Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="📄 Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
