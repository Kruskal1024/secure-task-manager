import { useState } from 'react';

function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  }

  function handleSave() {
    onEdit(task.id, {
      title: editTitle,
      description: editDescription,
      completed: task.completed,
      userId: task.userId,
    });
    setIsEditing(false);
  }

  function handleToggleCompleted() {
    onEdit(task.id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
      userId: task.userId,
    });
  }

  if (isEditing) {
    return (
      <li className="task-item task-item-editing">
        <div className="task-edit-form">
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="edit-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="2"
          />
          <div className="task-actions">
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="task-item">
      <div className="task-info">
        <label className="task-checkbox-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompleted}
          />
          <h3 className="task-title">{task.title}</h3>
        </label>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-actions">
        <span className={task.completed ? 'badge badge-completed' : 'badge badge-pending'}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskCard;