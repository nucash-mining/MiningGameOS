import React, { useState } from "react";
import './StartMenu.css'; // Import the relevant CSS
import browserIcon from '../assets/browser.png';
import SwapinLogo from '../assets/SwapinLogo.png';
import WattLogo from '../assets/WattLogo.png';

function StartMenu({ walletConnected, walletAddress, handleConnectClick, handleDisconnectClick, launchApp }) {
  const [appsOpen, setAppsOpen] = useState(false); // Handle hover for Apps
  const [defiOpen, setDefiOpen] = useState(false); // Handle hover for DeFi
  const [minersOpen, setMinersOpen] = useState(false); // Handle hover for Miners
  const [settingsOpen, setSettingsOpen] = useState(false); // Handle hover for a second menu (Settings)

  return (
    <div className="start-menu-wrapper">
      <div className="start-menu">
        {/* Wallet Info */}
        <div className="wallet-info">
          {walletConnected ? (
            <p>Wallet: {walletAddress}</p>
          ) : (
            <button onClick={handleConnectClick}>Connect to EVM</button>
          )}
          {walletConnected && (
            <button onClick={handleDisconnectClick}>Disconnect</button>
          )}
        </div>

        {/* Apps Menu */}
        <ul>
          <li
            onMouseEnter={() => setAppsOpen(true)}
            onMouseLeave={() => setAppsOpen(false)}
            className="menu-item"
          >
            Apps <span className="arrow">▶</span>
            {appsOpen && (
              <ul className="submenu">
                <li onClick={() => launchApp("Browser")}><img src={browserIcon} alt="Browser" /> Browser</li>
                <li
                  onMouseEnter={() => setDefiOpen(true)}
                  onMouseLeave={() => setDefiOpen(false)}
                  className="menu-item"
                >
                  DeFi <span className="arrow">▶</span>
                  {defiOpen && (
                    <ul className="submenu">
                      <li onClick={() => launchApp("DerpFi")}>DerpFi</li>
                      <li onClick={() => launchApp("SwapinDEX")}>
                        <img src={SwapinLogo} alt="SwapinDEX" /> SwapinDEX
                      </li>
                      <li onClick={() => launchApp("Mining Game")}>
                        <img src={WattLogo} alt="Mining Game" /> Mining Game
                      </li>
                      <li onClick={() => launchApp("URANUS-DAO")}>URANUS-DAO</li>
                    </ul>
                  )}
                </li>
                <li
                  onMouseEnter={() => setMinersOpen(true)}
                  onMouseLeave={() => setMinersOpen(false)}
                  className="menu-item"
                >
                  Miners <span className="arrow">▶</span>
                  {minersOpen && (
                    <ul className="submenu">
                      <li onClick={() => launchApp("THA Miner")}>THA Miner</li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Settings Menu */}
          <li
            onMouseEnter={() => setSettingsOpen(true)}
            onMouseLeave={() => setSettingsOpen(false)}
            className="menu-item"
          >
            Settings <span className="arrow">▶</span>
            {settingsOpen && (
              <ul className="second-menu">
                <li>General Settings</li>
                <li>Display Settings</li>
                <li>Sound Settings</li>
              </ul>
            )}
          </li>

          {/* Connect EVM (Replacing Power) */}
          <li>
            {walletConnected ? (
              <button onClick={handleDisconnectClick}>Disconnect EVM</button>
            ) : (
              <button onClick={handleConnectClick}>Connect EVM</button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StartMenu;
