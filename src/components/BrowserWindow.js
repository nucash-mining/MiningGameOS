import React, { useState, useRef, useEffect } from 'react';
import './BrowserWindow.css';

function BrowserWindow({ minimizeWindow, closeWindow }) {
  const [url, setUrl] = useState('https://duckduckgo.com'); // Default to DuckDuckGo
  const [iframeBlocked, setIframeBlocked] = useState(false); // Track if the iframe is blocked
  const iframeRef = useRef(null); // Reference to the iframe
  const [isDragging, setIsDragging] = useState(false); // For dragging
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Default position
  const dragOffset = useRef({ x: 0, y: 0 });

  // Handle URL submission
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setIframeBlocked(false); // Reset iframe blocked state when a new URL is submitted
    setUrl(url.startsWith('http') ? url : `https://duckduckgo.com/?q=${url}`);
  };

  // Handle URL change in the input
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Dragging functionality for the title bar only
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  // Check if iframe is blocked and open in a new tab if necessary
  const handleIframeLoad = () => {
    try {
      const iframeWindow = iframeRef.current.contentWindow;
      if (iframeWindow.location.href === 'about:blank') {
        setIframeBlocked(true);
      }
    } catch (err) {
      setIframeBlocked(true);
    }
  };

  return (
    <div
      className="browser-window"
      style={{ top: position.y, left: position.x, position: 'absolute' }}
    >
      {/* Title Bar with buttons */}
      <div className="window-header" onMouseDown={handleMouseDown}>
        <button onClick={minimizeWindow}>_</button>
        <button>⤡</button> {/* Placeholder for maximize/restore */}
        <button onClick={closeWindow} style={{ backgroundColor: 'lightblue', borderRadius: '50%' }}>X</button>
      </div>

      {/* Browser controls */}
      <div className="browser-controls">
        <button onClick={() => iframeRef.current.contentWindow.history.back()}>← Back</button>
        <button onClick={() => iframeRef.current.contentWindow.history.forward()}>→ Forward</button>
        <button onClick={() => setUrl(url)}>⟳ Refresh</button>
        <button onClick={() => setUrl('https://duckduckgo.com')}>🏠 Home</button>
        <form onSubmit={handleUrlSubmit} className="url-bar">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="browser-url-input"
          />
          <button type="submit">Go</button>
        </form>
      </div>

      {/* Iframe to load the website */}
      <div className="window-content">
        {!iframeBlocked ? (
          <iframe
            ref={iframeRef}
            src={url}
            title="Browser"
            className="browser-iframe"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onLoad={handleIframeLoad}
            onError={() => setIframeBlocked(true)}
          />
        ) : (
          <div className="blocked-message">
            <p>
              This site cannot be displayed within the browser window.
              <br />
              <button onClick={() => window.open(url, '_blank')}>
                Open in a New Tab
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowserWindow;
