import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchTasks() {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8081/api/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`http://localhost:8081/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function editTask(id, updatedTask) {
    try {
      const response = await fetch(`http://localhost:8081/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <AddTaskForm onTaskAdded={fetchTasks} />

        <section className="task-list-area">
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;