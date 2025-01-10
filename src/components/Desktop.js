import React, { useState, useEffect } from 'react';
import StartMenu from './StartMenu';
import MinerWindow from './MinerWindow';
import BrowserWindow from './BrowserWindow';
import SwapinDEXWindow from './SwapinDEXWindow'; // Assuming you have this component
import { createFolderOnChain } from './web3Interactions';
import DesktopIcon from './DesktopIcon';
import Taskbar from './components/Taskbar';
import browserIcon from '../assets/browser_icon.png'; // Add correct paths for icons
import swapinDexIcon from '../assets/swapinDexIcon.png';
import miningGameIcon from '../assets/miningGameIcon.png';

const Desktop = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showMiner, setShowMiner] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showSwapinDEX, setShowSwapinDEX] = useState(false); // Handle SwapinDEX window visibility
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [folders, setFolders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [desktopApps, setDesktopApps] = useState([
    { name: 'Browser', icon: browserIcon },
    { name: 'SwapinDEX', icon: swapinDexIcon },
    { name: 'MiningGame', icon: miningGameIcon },
  ]); // Track desktop apps
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInput, setRenameInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle Start Menu toggle
  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu);
  };

  // Right-click context menu handler
  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent default right-click behavior
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  };

  // Hide context menu on outside click
  const handleClick = () => {
    setShowContextMenu(false);
  };

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Add folder functionality with on-chain interaction
  const createFolder = async () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      await createFolderOnChain(folderName);  // Store folder on-chain
      setFolders([...folders, folderName]);   // Store it locally
    }
    setShowContextMenu(false);
  };

  // Function to launch an app window (Browser, SwapinDEX, etc.)
  const openApp = (appName) => {
    if (appName === "Browser") {
      setShowBrowser(true);
    } else if (appName === "SwapinDEX") {
      setShowSwapinDEX(true);
    } else if (appName === "MiningGame") {
      setShowMiner(true);
    }
  };

  // Function to close the app window
  const closeApp = (appName) => {
    if (appName === "Browser") {
      setShowBrowser(false);
    } else if (appName === "SwapinDEX") {
      setShowSwapinDEX(false);
    } else if (appName === "MiningGame") {
      setShowMiner(false);
    }
  };

  return (
    <div className="desktop" onContextMenu={handleRightClick} onClick={handleClick}>
      {/* Taskbar */}
      <Taskbar currentTime={currentTime} />

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          setShowMiner={setShowMiner}
        />
      )}

      {/* Render folders */}
      {folders.map((folder, index) => (
        <div key={index} className="folder">
          <img src="./images/folder_icon.png" alt="folder" />
          <p>{folder}</p>
        </div>
      ))}

      {/* Context Menu */}
      {showContextMenu && (
        <div
          className="context-menu"
          style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
        >
          <ul>
            <li onClick={() => alert('Terminal opened!')}>
              <img src="./images/terminal_icon.png" alt="terminal" />
              Open Terminal
            </li>
            <li onClick={createFolder}>
              <img src="./images/folder_icon.png" alt="folder" />
              Create Folder
            </li>
          </ul>
        </div>
      )}

      {/* Render desktop icons for apps */}
      <div className="desktop-icons">
        {desktopApps.map((app, index) => (
          <DesktopIcon key={index} appName={app.name} icon={app.icon} openApp={openApp} />
        ))}
      </div>

      {/* Show Browser Window */}
      {showBrowser && (
        <BrowserWindow onClose={() => closeApp("Browser")} />
      )}

      {/* Show SwapinDEX Window */}
      {showSwapinDEX && (
        <SwapinDEXWindow onClose={() => closeApp("SwapinDEX")} />
      )}

      {/* Show Mining Game Window */}
      {showMiner && (
        <MinerWindow onClose={() => closeApp("MiningGame")} />
      )}
    </div>
  );
};

export default Desktop;
