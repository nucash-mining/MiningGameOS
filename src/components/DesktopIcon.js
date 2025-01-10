import React from 'react';
import './DesktopIcon.css'; // Add some styling for your icons

function DesktopIcon({ appName, icon, openApp }) {
  return (
    <div className="desktop-icon" onClick={() => openApp(appName)}>
      <img src={icon} alt={appName} className="app-icon" />
      <p>{appName}</p>
    </div>
  );
}

export default DesktopIcon;
