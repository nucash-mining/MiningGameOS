import React, { useState } from "react";
import Taskbar from './components/Taskbar';
import ConnectWindow from './components/ConnectWindow';
import StartMenu from './components/StartMenu';
import BrowserWindow from './components/BrowserWindow';
import SwapinDEXWindow from './components/SwapinDEXWindow'; // Import the new SwapinDEX Window
import DesktopIcon from './components/DesktopIcon'; // Import Desktop Icon component
import './App.css';
import backgroundImage from './assets/MiningGameBackground.png';
import Web3 from 'web3';

function App() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showConnectWindow, setShowConnectWindow] = useState(true); // Always show the tab until the window is closed
  const [openWindows, setOpenWindows] = useState([]); // Track open windows
  const [minimizedWindows, setMinimizedWindows] = useState([]); // Track minimized windows
  const [currentChain, setCurrentChain] = useState(""); // Track the current connected chain
  const [desktopApps, setDesktopApps] = useState([]); // Track apps added to the desktop

  // Toggle Start Menu
  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  // Handle Connect to EVM Click (Only open if window is not already open or minimized)
  const handleConnectClick = () => {
    if (!showConnectWindow && !minimizedWindows.includes("Connect to EVM")) {
      setShowConnectWindow(true); // Show the window with chain options
    }
  };

  // Close the Connect Window and disconnect wallet
  const closeConnectWindow = () => {
    setShowConnectWindow(false); // Close the connect window
    setWalletAddress(""); // Disconnect wallet
    setWalletConnected(false); // Set wallet status to disconnected
    setCurrentChain(""); // Clear current chain when disconnected
  };

  // Minimize the Connect Window to Taskbar (only one instance allowed)
  const minimizeConnectWindow = () => {
    setShowConnectWindow(false); // Hide the window
    if (!minimizedWindows.includes("Connect to EVM")) {
      setMinimizedWindows([...minimizedWindows, "Connect to EVM"]); // Add tab to taskbar
    }
  };

  // Restore the Connect Window from Taskbar
  const restoreConnectWindow = (windowName) => {
    if (windowName === "Connect to EVM") {
      setShowConnectWindow(true); // Restore the window
      setMinimizedWindows(minimizedWindows.filter(w => w !== windowName)); // Remove tab
    }
  };

  // Connect to Blockchain Functionality (Altcoinchain & Polygon)
  const connectToChain = async (chain) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        setWalletConnected(true);

        let chainId;
        let rpcUrl;

        if (chain === "Altcoinchain") {
          chainId = "0x91A"; // 2330 in hex
          rpcUrl = "http://62.72.177.111:8145";
        } else if (chain === "Polygon") {
          chainId = "0x89"; // 137 in hex (Polygon mainnet)
          rpcUrl = "https://polygon-rpc.com";
        }

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chainId,
            rpcUrls: [rpcUrl],
            chainName: chain === "Altcoinchain" ? "Altcoinchain" : "Polygon",
            nativeCurrency: {
              name: chain === "Altcoinchain" ? "ALT" : "MATIC",
              symbol: chain === "Altcoinchain" ? "ALT" : "MATIC",
              decimals: 18
            },
            blockExplorerUrls: chain === "Altcoinchain" ? ["http://altcoinexplorer.com"] : ["https://polygonscan.com"]
          }]
        });
        setCurrentChain(chain); // Set the current chain after connection
      } catch (error) {
        console.error("Connection failed:", error);
      }
    }
  };

  // Handle wallet disconnect from StartMenu
  const handleDisconnectClick = () => {
    setWalletAddress(""); // Disconnect wallet
    setWalletConnected(false); // Set wallet status to disconnected
  };

  // Logout Functionality
  const logout = () => {
    setWalletAddress("");
    setWalletConnected(false);
    setCurrentChain(""); // Clear the current chain when logging out
  };

  // Function to format wallet address (e.g., 0x1234...5678)
  const formatWalletAddress = (address) => {
    if (address) {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    return "";
  };

  // Function to launch apps/windows
  const launchApp = (appName) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName]);
    }
  };

  // Minimize window to Taskbar
  const minimizeWindow = (appName) => {
    setMinimizedWindows([...minimizedWindows, appName]);
    setOpenWindows(openWindows.filter(w => w !== appName));
  };

  // Restore window from Taskbar
  const restoreWindow = (appName) => {
    setOpenWindows([...openWindows, appName]);
    setMinimizedWindows(minimizedWindows.filter(w => w !== appName));
  };

  // Add app to desktop
  const addAppToDesktop = (appName) => {
    if (!desktopApps.includes(appName)) {
      setDesktopApps([...desktopApps, appName]); // Add app to desktop if not already added
    }
  };

  // Open app from desktop icon
  const openAppFromDesktop = (appName) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName]);
    }
  };

  return (
    <div className="app-container">
      <div
        className="desktop"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        {/* Render Desktop Icons */}
        <div className="desktop-icons">
          {desktopApps.map((appName, index) => (
            <DesktopIcon key={index} appName={appName} openApp={openAppFromDesktop} />
          ))}
        </div>

        {/* Taskbar */}
        <Taskbar
          toggleStartMenu={toggleStartMenu}
          minimizedWindows={minimizedWindows}
          restoreWindow={restoreWindow}
          restoreConnectWindow={restoreConnectWindow} // Add restore for ConnectWindow
        />

        {/* Start Menu */}
        {startMenuOpen && (
          <StartMenu
            walletConnected={walletConnected}
            walletAddress={formatWalletAddress(walletAddress)}
            handleConnectClick={handleConnectClick}
            handleDisconnectClick={handleDisconnectClick} // Pass disconnect functionality
            addAppToDesktop={addAppToDesktop} // Function to add app to desktop
            launchApp={launchApp} // Launch apps from start menu
          />
        )}

        {/* Connect to EVM Window */}
        {showConnectWindow && (
          <ConnectWindow
            connectToChain={connectToChain}
            closeWindow={closeConnectWindow}
            minimizeWindow={minimizeConnectWindow}
            walletAddress={walletAddress}
            logout={logout}
            currentChain={currentChain} // Pass the current connected chain
            setCurrentChain={setCurrentChain} // Allow setting chain in ConnectWindow
          />
        )}

        {/* Example: BrowserWindow */}
        {openWindows.includes("Browser") && (
          <BrowserWindow
            minimizeWindow={() => minimizeWindow("Browser")}
            closeWindow={() => setOpenWindows(openWindows.filter(w => w !== "Browser"))}
          />
        )}

        {/* SwapinDEX Window */}
        {openWindows.includes("SwapinDEX") && (
          <SwapinDEXWindow
            minimizeWindow={() => minimizeWindow("SwapinDEX")}
            closeWindow={() => setOpenWindows(openWindows.filter(w => w !== "SwapinDEX"))}
          />
        )}

      </div>
    </div>
  );
}

export default App;
