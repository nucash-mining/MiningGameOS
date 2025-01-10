import React from 'react';
import './Taskbar.css'; // Import the CSS

const TaskbarTab = ({ icon, label, onClick }) => {
  return (
    <div className="taskbar-tab-container" onClick={onClick}>
      <img src={icon} alt="app-icon" className="taskbar-tab-icon" />
      <span className="taskbar-tab-text">{label}</span>
    </div>
  );
};

export default TaskbarTab;
