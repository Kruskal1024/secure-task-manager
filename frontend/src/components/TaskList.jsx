import './TaskList.css';
import TaskCard from './TaskCard';

function TaskList({ tasks, loading, error, onDelete, onEdit }) {
  if (loading) {
    return <p className="placeholder-text">Loading tasks...</p>;
  }

  if (error) {
    return <p className="placeholder-text">Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="placeholder-text">No tasks yet.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}

export default TaskList;