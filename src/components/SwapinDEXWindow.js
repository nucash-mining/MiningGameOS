// SwapinDEXWindow.js
import React, { useState, useRef } from 'react';
import './SwapinDEXWindow.css'; // Import relevant CSS for styling

function SwapinDEXWindow({ minimizeWindow, closeWindow }) {
  const iframeRef = useRef(null); // Reference to the iframe

  // Function to refresh the DApp page
  const refreshPage = () => {
    iframeRef.current.src = iframeRef.current.src;
  };

  return (
    <div className="swapin-dex-window">
      <div className="window-header">
        <button onClick={minimizeWindow}>_</button>
        <button onClick={refreshPage}>⟳</button>
        <button onClick={closeWindow}>X</button>
      </div>
      
      <div className="window-content">
        <iframe
          ref={iframeRef}
          src="https://swapin.co"
          title="SwapinDEX"
          className="swapin-iframe"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
}

export default SwapinDEXWindow;
