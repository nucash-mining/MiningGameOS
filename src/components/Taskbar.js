import React from "react";
import Clock from "./Clock";
import wattLogo from '../assets/WattLogo.png'; // Correct logo for the Start button
import connectIcon from '../assets/ConnectIcon.png'; // Icon for minimized window
import './Taskbar.css';

function Taskbar({ toggleStartMenu, minimizedWindows, restoreWindow }) {
  return (
    <div className="taskbar">
      <button
        className="start-btn"
        onClick={toggleStartMenu}
        style={{
          backgroundImage: `url(${wattLogo})`, // Correctly set WattLogo as Start button background
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="start-btn-text">Start</span>
      </button>

      {/* Render minimized windows as tabs */}
      <div className="window-tabs">
        {minimizedWindows.map((window, index) => (
          <div key={index} className="window-tab" onClick={() => restoreWindow(window)}>
            {window === "Connect to EVM" && (
              <>
                <img src={connectIcon} alt="Connect EVM" className="connect-icon" />
                <span className="connect-text">Connect EVM</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Use the Clock component */}
      <Clock />
    </div>
  );
}

export default Taskbar;
