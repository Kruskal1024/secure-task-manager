import { useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const newTask = {
      title: title,
      description: description,
      completed: false,
      userId: Number(userId),
    };

    try {
      const response = await fetch('http://localhost:8081/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setTitle('');
      setDescription('');
      setUserId('');

      onTaskAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish backend CRUD"
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details about the task"
          rows="3"
        />
      </div>

      <div className="form-field">
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g. 1"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default AddTaskForm;